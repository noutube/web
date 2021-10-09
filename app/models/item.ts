import Model, { attr, belongsTo } from '@ember-data/model';

import SubscriptionModel from 'noutube/models/subscription';
import VideoModel from 'noutube/models/video';

export default class ItemModel extends Model {
  @attr('string') declare state: 'state_new' | 'state_later';

  @belongsTo('subscription', { async: false })
  declare subscription: SubscriptionModel;
  @belongsTo('video', { async: false })
  declare video: VideoModel;

  get new(): boolean {
    return this.state === 'state_new' && !this.isDeleted;
  }

  get later(): boolean {
    return this.state === 'state_later' && !this.isDeleted;
  }

  get age(): number {
    return Date.now() - this.video.showAt.getTime();
  }

  get sortableTitle(): string {
    return this.video.title.toLowerCase();
  }

  get duration(): number {
    return this.video.duration;
  }

  async markLater(): Promise<void> {
    this.state = 'state_later';
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }

  async markDeleted(): Promise<void> {
    this.deleteRecord();
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    item: ItemModel;
    items: ItemModel;
  }
}
