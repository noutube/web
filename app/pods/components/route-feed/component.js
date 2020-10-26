import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RouteFeedComponent extends Component {
  @service settings;

  get newSubscriptions() {
    return this.args.subscriptions.filterBy('hasNew');
  }
  get laterSubscriptions() {
    return this.args.subscriptions.filterBy('hasLater');
  }

  get newItems() {
    return this.args.items.filterBy('new');
  }
  get laterItems() {
    return this.args.items.filterBy('later');
  }

  get allItems() {
    return this.args.items.filterBy('isDeleted', false);
  }

  get anyItems() {
    return this.allItems.length > 0;
  }

  get titleNotification() {
    return this.newItems.length > 0 ? `(${this.newItems.length})` : '';
  }

  @tracked showSorting = false;

  @action
  toggleSorting() {
    this.showSorting = !this.showSorting;
  }

  @tracked showOpml = false;

  @action
  toggleOpml() {
    this.showOpml = !this.showOpml;
  }
}
