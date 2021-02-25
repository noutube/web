import Model, { belongsTo, hasMany } from '@ember-data/model';
import EmberArray from '@ember/array';

import ApplicationAdapter from 'nou2ube/adapters/application';
import ChannelModel from 'nou2ube/models/channel';
import ItemModel from 'nou2ube/models/item';

export default class SubscriptionModel extends Model {
  @belongsTo('channel', { async: false })
  declare channel: ChannelModel;
  @hasMany('items', { async: false })
  declare items: EmberArray<ItemModel>;

  get newItems(): ItemModel[] {
    return this.items.filterBy('new');
  }
  get hasNew(): boolean {
    return this.newItems.length > 0;
  }

  get laterItems(): ItemModel[] {
    return this.items.filterBy('later');
  }
  get hasLater(): boolean {
    return this.laterItems.length > 0;
  }

  get sortableTitle(): string {
    return this.channel.title.toLowerCase();
  }
  get newSortableTitle(): string {
    return this.sortableTitle;
  }
  get laterSortableTitle(): string {
    return this.sortableTitle;
  }

  get newTotalDuration(): number {
    const videos = this.newItems.map((item) => item.video);
    const durations = videos.map((video) => video.duration);
    return durations.reduce((acc, n) => acc + n, 0);
  }
  get laterTotalDuration(): number {
    const videos = this.laterItems.map((item) => item.video);
    const durations = videos.map((video) => video.duration);
    return durations.reduce((acc, n) => acc + n, 0);
  }

  get newItemCount(): number {
    return this.newItems.length;
  }
  get laterItemCount(): number {
    return this.laterItems.length;
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    subscription: SubscriptionModel;
    subscriptions: SubscriptionModel;
  }
}

declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    subscription: ApplicationAdapter;
  }
}
