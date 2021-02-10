import Component from '@glimmer/component';

import SubscriptionModel from 'nou2ube/models/subscription';

interface Args {
  subscriptions: SubscriptionModel[];
}

export default class SubscriptionsComponent extends Component<Args> {
  get subscriptionsSorted(): SubscriptionModel[] {
    return this.args.subscriptions.sortBy('sortableTitle');
  }
}
