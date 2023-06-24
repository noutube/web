/* eslint-disable ember/no-observers */

import { getOwner } from '@ember/application';
import { addObserver, removeObserver } from '@ember/object/observers';
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
 * Using observers is always a bit dirty, but the model lifecycle events
 * were removed in 4.x, so there's no other way.
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
  const didResolve = function (this: Model) {
    if (!(!this.isNew || !this.isValid || this.isError)) {
      return;
    }
    resolvedCount += 1;
    if (creatingModels.length === resolvedCount) {
      finish();
    }
  };

  // resolve if the model now exists in the store
  const didCreate = function (this: Model) {
    if (store.peekRecord(type, id)) {
      finish();
    } else {
      didResolve.call(this);
    }
  };

  const start = () => {
    creatingModels.forEach((model) => {
      // explicitly access computed properties, otherwise they may not be fired
      model.isNew, model.isValid, model.isError;
      addObserver(model, 'isNew', didCreate);
      addObserver(model, 'isValid', didResolve);
      addObserver(model, 'isError', didResolve);
    });
  };

  const finish = () => {
    creatingModels.forEach((model) => {
      removeObserver(model, 'isNew', didCreate);
      removeObserver(model, 'isValid', didResolve);
      removeObserver(model, 'isError', didResolve);
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
    // explicitly access computed properties, otherwise they may not be fired
    model.isDeleted, model.isValid, model.isError;
    addObserver(model, 'isDeleted', finish);
    addObserver(model, 'isValid', finish);
    addObserver(model, 'isError', finish);
  };

  const finish = () => {
    if (!(model.isDeleted || !model.isValid || model.isError)) {
      return;
    }
    removeObserver(model, 'isDeleted', finish);
    removeObserver(model, 'isValid', finish);
    removeObserver(model, 'isError', finish);
    deferred.resolve(model);
  };

  start();

  return deferred.promise;
}
