import Component from '@glimmer/component';

export default class SubscriptionsComponent extends Component {
  get subscriptionsSorted() {
    return this.args.subscriptions.sortBy('sortableTitle');
  }
}
