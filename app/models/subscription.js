import { computed, get } from '@ember/object';
import { alias, filterBy, map } from '@ember/object/computed';

import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class SubscriptionModel extends Model {
  @belongsTo('channel') channel;
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
    return get(this.channel, 'title').toLowerCase();
  }
  @alias('sortableTitle') newSortableTitle;
  @alias('sortableTitle') laterSortableTitle;

  @map('newItems.@each.video', (item) => item.video) newVideos;
  @computed('newVideos.@each.duration')
  get newTotalDuration() {
    return this.newVideos.map((video) => get(video, 'duration')).reduce((acc, n) => acc + n, 0);
  }

  @map('laterItems.@each.video', (item) => item.video) laterVideos;
  @computed('laterVideos.@each.duration')
  get laterTotalDuration() {
    return this.laterVideos.map((video) => get(video, 'duration')).reduce((acc, n) => acc + n, 0);
  }

  @alias('newItems.length') newItemCount;
  @alias('laterItems.length') laterItemCount;
}
