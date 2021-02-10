import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import ItemModel from 'nou2ube/models/item';
import SubscriptionModel from 'nou2ube/models/subscription';
import SettingsService from 'nou2ube/services/settings';

interface Args {
  items: ItemModel[];
  subscriptions: SubscriptionModel[];
}

export default class RouteFeedComponent extends Component<Args> {
  @service declare settings: SettingsService;

  get newSubscriptions(): SubscriptionModel[] {
    return this.args.subscriptions.filterBy('hasNew');
  }
  get laterSubscriptions(): SubscriptionModel[] {
    return this.args.subscriptions.filterBy('hasLater');
  }

  get newItems(): ItemModel[] {
    return this.args.items.filterBy('new');
  }
  get laterItems(): ItemModel[] {
    return this.args.items.filterBy('later');
  }

  get allItems(): ItemModel[] {
    return this.args.items.filterBy('isDeleted', false);
  }

  get anyItems(): boolean {
    return this.allItems.length > 0;
  }

  get titleNotification(): string {
    return this.newItems.length > 0 ? `(${this.newItems.length})` : '';
  }

  @tracked showSettings = false;

  @action
  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  @tracked showSubscriptions = false;

  @action
  toggleSubscriptions(): void {
    this.showSubscriptions = !this.showSubscriptions;
  }
}
