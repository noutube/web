import { action, computed, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';

import Model, { attr, belongsTo } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('string') state;

  @belongsTo('subscription') subscription;
  @belongsTo('video') video;

  @computed('state', 'isDeleted')
  get new() {
    return this.state === 'state_new' && !this.isDeleted;
  }

  @computed('state', 'isDeleted')
  get later() {
    return this.state === 'state_later' && !this.isDeleted;
  }

  get age() {
    return Date.now() - get(this.video, 'publishedAt').getTime();
  }

  @computed('video.title')
  get sortableTitle() {
    return get(this.video, 'title').toLowerCase();
  }

  @alias('video.duration') duration;

  @action
  markLater() {
    set(this, 'state', 'state_later');
    this.save().catch(() => this.rollbackAttributes());
  }

  @action
  markDeleted() {
    this.deleteRecord();
    this.save().catch(() => this.rollbackAttributes());
  }
}
