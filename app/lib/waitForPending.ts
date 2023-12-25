import { getOwner } from '@ember/application';
import Model from '@ember-data/model';
import Store from '@ember-data/store';
import ModelRegistry from 'ember-data/types/registries/model';
import { defer } from 'rsvp';

import ApplicationSerializer from 'noutube/serializers/application';

/**
 * https://github.com/emberjs/data/issues/4262#issuecomment-240139154
 *
 * Basically, if you're pushing events across a websocket, you end up with
 * race conditions where the model save operation may still be in flight.
 *
 * For creates, this causes two copies of the model to appear, because the
 * ID of the first model isn't known until the save completes and fills it
 * in, but the push already created a second copy first.
 *
 * For deletes, you simply aren't allowed by ember-data to unload the model
 * while it's in flight.
 *
 * In either case, this trick finds any relevant models in flight and waits
 * for them to complete, at which point it's then safe to process the event.
 *
 * Unfortunately, the model lifecycle events used are deprecated until 4.x,
 * but hopefully they can be replaced with ember-concurrency waitForProperty.
 */

interface Data {
  id: string;
  type: keyof ModelRegistry;
}

export async function waitForPendingCreate(
  store: Store,
  data: Data
): Promise<void> {
  const { id } = data;
  const serializer = getOwner(store).lookup(
    'serializer:application'
  ) as ApplicationSerializer;
  const type = serializer.modelNameFromPayloadKey(data.type as string);

  // if the model is already in the store, return immediately
  if (store.peekRecord(type, id)) {
    return;
  }

  // watch for models currently being created
  const creatingModels = store
    .peekAll(type)
    .filter((model) => model.isSaving && model.dirtyType === 'created');
  // if no models of this type are being created, return immediately
  if (creatingModels.length === 0) {
    return;
  }

  let resolvedCount = 0;

  const deferred = defer<void>();

  // resolve once all create requests have resolved
  const didResolve = () => {
    resolvedCount += 1;
    if (creatingModels.length === resolvedCount) {
      finish();
    }
  };

  // resolve if the model now exists in the store
  const didCreate = () => {
    if (store.peekRecord(type, id)) {
      finish();
    } else {
      didResolve();
    }
  };

  const start = () => {
    creatingModels.forEach((model) => {
      model.on('didCreate', didCreate);
      model.on('becameInvalid', didResolve);
      model.on('becameError', didResolve);
    });
  };

  const finish = () => {
    creatingModels.forEach((model) => {
      model.off('didCreate', didCreate);
      model.off('becameInvalid', didResolve);
      model.off('becameError', didResolve);
    });
    deferred.resolve();
  };

  start();

  return deferred.promise;
}

export async function waitForPendingDelete(
  store: Store,
  data: Data
): Promise<Model | void> {
  const { id } = data;
  const serializer = getOwner(store).lookup(
    'serializer:application'
  ) as ApplicationSerializer;
  const type = serializer.modelNameFromPayloadKey(data.type as string);

  const model = store.peekRecord(type, id);

  // if the model is already not in the store, return immediately
  if (!model) {
    return;
  }

  // if the model is not being deleted, return immediately
  if (!model.isSaving || model.dirtyType !== 'deleted') {
    return model;
  }

  // wait for delete to complete
  const deferred = defer<Model>();

  const start = () => {
    model.on('didDelete', finish);
    model.on('becameInvalid', finish);
    model.on('becameError', finish);
  };

  const finish = () => {
    model.off('didDelete', finish);
    model.off('becameInvalid', finish);
    model.off('becameError', finish);
    deferred.resolve(model);
  };

  start();

  return deferred.promise;
}
