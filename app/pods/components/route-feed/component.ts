import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import ItemModel from 'noutube/models/item';
import SubscriptionModel from 'noutube/models/subscription';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    items: ItemModel[];
    subscriptions: SubscriptionModel[];
  };
}

export default class RouteFeedComponent extends Component<Signature> {
  @service declare router: RouterService;
  @service declare settings: SettingsService;

  @tracked showSettings = false;
  @tracked showSubscriptions = false;

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

  @action
  goToAccount(): void {
    this.router.transitionTo('account');
  }

  @action
  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }

  @action
  toggleSubscriptions(): void {
    this.showSubscriptions = !this.showSubscriptions;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteFeed: typeof RouteFeedComponent;
  }
}
