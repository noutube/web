import Component from '@glimmer/component';
import { action, computed, set } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class RouteFeedComponent extends Component {
  @service settings;

  @filterBy('args.subscriptions', 'hasNew') newSubscriptions;
  @filterBy('args.subscriptions', 'hasLater') laterSubscriptions;

  @filterBy('args.items', 'new') newItems;
  @filterBy('args.items', 'later') laterItems;

  @filterBy('args.items', 'isDeleted', false) allItems;
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
    set(this, 'showSorting', !this.showSorting);
  }
}
