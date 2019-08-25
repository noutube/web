import { computed } from '@ember/object';
import { alias, filterBy, map, sum } from '@ember/object/computed';

import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class SubscriptionModel extends Model {
  @belongsTo('channel', { async: false }) channel;
  @hasMany('items') items;

  @filterBy('items', 'new') newItems;
  @computed('newItems')
  get hasNew() {
    return this.newItems.length > 0;
  }

  @filterBy('items', 'later') laterItems;
  @computed('laterItems')
  get hasLater() {
    return this.laterItems.length > 0;
  }

  @computed('channel.title')
  get sortableTitle() {
    return this.channel.title.toLowerCase();
  }
  @alias('sortableTitle') newSortableTitle;
  @alias('sortableTitle') laterSortableTitle;

  @map('newItems.@each.video', (item) => item.video) newVideos;
  @map('newVideos.@each.duration', (video) => video.duration) newDurations;
  @sum('newDurations') newTotalDuration;

  @map('laterItems.@each.video', (item) => item.video) laterVideos;
  @map('laterVideos.@each.duration', (video) => video.duration) laterDurations;
  @sum('laterDurations') laterTotalDuration;

  @alias('newItems.length') newItemCount;
  @alias('laterItems.length') laterItemCount;
}
