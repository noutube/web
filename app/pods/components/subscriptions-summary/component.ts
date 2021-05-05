import Component from '@glint/environment-ember-loose/glimmer-component';

import SubscriptionModel from 'nou2ube/models/subscription';

interface Signature {
  Args: {
    subscriptions: SubscriptionModel[];
  };
}

export default class SubscriptionsSummaryComponent extends Component<Signature> {
  get subscriptionsSorted(): SubscriptionModel[] {
    return this.args.subscriptions.sortBy('sortableTitle');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SubscriptionsSummary: typeof SubscriptionsSummaryComponent;
  }
}
