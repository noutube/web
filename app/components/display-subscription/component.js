import Component from '@ember/component';
import { action, computed, get } from '@ember/object';
import { sort } from '@ember/object/computed';

import { classNames } from '@ember-decorators/component';

import { storageFor } from 'ember-local-storage';

export default
@classNames('subscription')
class DisplaySubscriptionComponent extends Component {
  @storageFor('settings') settings;

  subscription = null;
  state = null;

  @computed('state')
  get new() {
    return this.state === 'new';
  }

  // can't filterBy a bound key, do it manually
  @computed('subscription.items.@each.{new,later}', 'state')
  get itemsUnsorted() {
    return this.subscription.items.filterBy(this.state);
  }
  @sort('itemsUnsorted', 'settings.videoSort') items;

  @computed('items')
  get totalDuration() {
    return this.items.map((item) => get(item.video, 'duration')).reduce((acc, n) => acc + n, 0);
  }

  @action
  markAllLater() {
    this.items.invoke('markLater');
  }
  @action
  ignoreAll() {
    this.items.invoke('markDeleted');
  }
}
