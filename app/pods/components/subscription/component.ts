import { action } from '@ember/object';
import Component from '@glimmer/component';

import ItemModel from 'nou2ube/models/item';
import SubscriptionModel from 'nou2ube/models/subscription';

interface Args {
  subscription: SubscriptionModel;
  state: 'new' | 'later';
}

export default class SubscriptionComponent extends Component<Args> {
  get new(): boolean {
    return this.args.state === 'new';
  }

  get items(): ItemModel[] {
    if (this.new) {
      return this.args.subscription.newItems;
    } else {
      return this.args.subscription.laterItems;
    }
  }

  @action
  markAllLater(): void {
    this.items.invoke('markLater');
  }

  @action
  ignoreAll(): void {
    this.items.invoke('markDeleted');
  }
}
