import ArrayProxy from '@ember/array';
import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Store from '@ember-data/store';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import ModelRegistry from 'ember-data/types/registries/model';
import { hash } from 'rsvp';

import CableService from '@algonauti/ember-cable/services/cable';
import { Consumer, Subscription } from '@rails/actioncable';

import config from 'noutube/config/environment';
import JSONAPIPayload from 'noutube/lib/types/json-api-payload';
import {
  waitForPendingCreate,
  waitForPendingDelete
} from 'noutube/lib/waitForPending';
import ChannelModel from 'noutube/models/channel';
import VideoModel from 'noutube/models/video';
import PlayerService from 'noutube/services/player';
import SessionService from 'noutube/services/session';
import SettingsService from 'noutube/services/settings';

export interface Model {
  channels: ArrayProxy<ChannelModel>;
  videos: ArrayProxy<VideoModel>;
}

type FeedPushMessage = {
  action: 'push';
  payload: JSONAPIPayload;
};

type FeedDestroyMessage = {
  action: 'destroy';
  id: string;
  type: keyof ModelRegistry;
};

type FeedSettingsMessage = {
  action: 'settings';
  payload: Record<string, unknown>;
};

type FeedMessage = FeedPushMessage | FeedDestroyMessage | FeedSettingsMessage;

export default class FeedRoute extends Route {
  @service declare cable: CableService;
  @service declare player: PlayerService;
  @service declare router: RouterService;
  @service declare session: SessionService;
  @service declare settings: SettingsService;
  @service declare store: Store;

  #consumer: Consumer | null = null;
  #feed: Subscription | null = null;
  #reconnecting = false;

  get cableAddress(): string {
    const base = `${config.backendOrigin.replace(/^http/, 'ws')}/cable/`;
    if (this.session.signedIn) {
      return `${base}?token=${this.session.token}`;
    } else {
      return base;
    }
  }

  async beforeModel(transition: Transition): Promise<void> {
    if (!this.session.signedIn && !this.session.down) {
      this.router.transitionTo('landing');
    }
  }

  model(): Promise<Model> {
    if (this.session.down) {
      return new Promise(() => {
        // load indefinitely
      });
    } else {
      // fetch all data for user
      return hash({
        channels: this.store.findAll('channel'),
        videos: this.store.findAll('video')
      });
    }
  }

  activate(): void {
    if (this.session.down) {
      return;
    }

    this.#consumer = this.cable.createConsumer(this.cableAddress);

    this.#feed = this.#consumer.subscriptions.create('FeedChannel', {
      connected: () => {
        console.debug('[feed] connected');
        if (this.#reconnecting) {
          // fetch anything we missed
          this.reloadFromServer('channel');
          this.reloadFromServer('video');
        }
        this.#reconnecting = false;
      },

      disconnected: () => {
        if (!this.#reconnecting) {
          console.debug('[feed] disconnected');
          this.#reconnecting = true;
        }
      },

      received: async (data: FeedMessage) => {
        console.debug('[feed] message', data);
        switch (data.action) {
          case 'push':
            await waitForPendingCreate(this.store, data.payload.data);
            this.store.pushPayload(data.payload);

            // stop playing video when soft deleted
            if (
              data.payload.data.type === 'video' &&
              data.payload.data.id === this.player.video?.id &&
              data.payload.data.attributes.state === 'deleted'
            ) {
              this.player.stop();
            }
            break;
          case 'destroy': {
            const model = await waitForPendingDelete(this.store, data);
            if (model) {
              // stop playing video when hard deleted
              if (this.player.video === model) {
                this.player.stop();
              }

              model.unloadRecord();
            }
            break;
          }
          case 'settings':
            this.settings.load(data.payload);
            break;
        }
      }
    });
  }

  deactivate(): void {
    if (this.#consumer) {
      this.#consumer.disconnect();
      this.#consumer = null;
      if (this.#feed) {
        this.#feed.unsubscribe();
        this.#feed = null;
      }
      this.#reconnecting = false;
      console.debug('[feed] destroyed');
    }

    this.store.unloadAll('channel');
    this.store.unloadAll('video');
  }

  async reloadFromServer(modelName: keyof ModelRegistry): Promise<void> {
    const before = this.store.peekAll(modelName);
    const after = await this.store.query(modelName, {});
    // manually remove anything removed on server
    before
      .filter((model) => !after.findBy('id', model.id))
      .forEach((model) => model.unloadRecord());
  }
}
