import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';

import { storageFor } from 'ember-local-storage';

export default class RouteFeedComponent extends Component {
  @storageFor('settings') settings;

  items = null;
  subscriptions = null;

  @filterBy('subscriptions', 'hasNew') newSubscriptions;
  @filterBy('subscriptions', 'hasLater') laterSubscriptions;

  @filterBy('items', 'new') newItems;
  @filterBy('items', 'later') laterItems;

  @filterBy('items', 'isDeleted', false) allItems;
  @computed('allItems')
  get anyItems() {
    return this.allItems.length > 0;
  }

  @computed('newItems')
  get titleNotification() {
    return this.newItems.length > 0 ? `(${this.newItems.length})` : '';
  }

  showSorting = false;

  @action
  toggleSorting() {
    this.toggleProperty('showSorting');
  }
}
