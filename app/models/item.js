import { action } from '@ember/object';

import Model, { attr, belongsTo } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('string') state;

  @belongsTo('subscription') subscription;
  @belongsTo('video', { async: false }) video;

  get new() {
    return this.state === 'state_new' && !this.isDeleted;
  }

  get later() {
    return this.state === 'state_later' && !this.isDeleted;
  }

  get age() {
    return Date.now() - this.video.publishedAt.getTime();
  }

  get sortableTitle() {
    return this.video.title.toLowerCase();
  }

  get duration() {
    return this.video.duration;
  }

  @action
  markLater() {
    this.state = 'state_later';
    this.save().catch(() => this.rollbackAttributes());
  }

  @action
  markDeleted() {
    this.deleteRecord();
    this.save().catch(() => this.rollbackAttributes());
  }
}
