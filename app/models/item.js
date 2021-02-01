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
    return Date.now() - this.video.showAt.getTime();
  }

  get sortableTitle() {
    return this.video.title.toLowerCase();
  }

  get duration() {
    return this.video.duration;
  }

  async markLater() {
    this.state = 'state_later';
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }

  async markDeleted() {
    this.deleteRecord();
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }
}
