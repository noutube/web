import { action } from '@ember/object';
import Component from '@glint/environment-ember-loose/glimmer-component';

import ItemModel from 'noutube/models/item';
import SubscriptionModel from 'noutube/models/subscription';

interface Signature {
  Args: {
    subscription: SubscriptionModel;
    state: 'new' | 'later';
  };
}

export default class SubscriptionComponent extends Component<Signature> {
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Subscription: typeof SubscriptionComponent;
  }
}
