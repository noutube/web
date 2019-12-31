import Model, { belongsTo, hasMany } from '@ember-data/model';

export default class SubscriptionModel extends Model {
  @belongsTo('channel', { async: false }) channel;
  @hasMany('items') items;

  get newItems() {
    return this.items.filterBy('new');
  }
  get hasNew() {
    return this.newItems.length > 0;
  }

  get laterItems() {
    return this.items.filterBy('later');
  }
  get hasLater() {
    return this.laterItems.length > 0;
  }

  get sortableTitle() {
    return this.channel.title.toLowerCase();
  }
  get newSortableTitle() {
    return this.sortableTitle;
  }
  get laterSortableTitle() {
    return this.sortableTitle;
  }

  get newTotalDuration() {
    let videos = this.newItems.map((item) => item.video);
    let durations = videos.map((video) => video.duration);
    return durations.reduce((acc, n) => acc + n, 0);
  }
  get laterTotalDuration() {
    let videos = this.laterItems.map((item) => item.video);
    let durations = videos.map((video) => video.duration);
    return durations.reduce((acc, n) => acc + n, 0);
  }

  get newItemCount() {
    return this.newItems.length;
  }
  get laterItemCount() {
    return this.laterItems.length;
  }
}
