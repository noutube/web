import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SubscriptionsComponent extends Component {
  @service settings;

  get subscriptionsSorted() {
    let { channelKey, channelDir } = this.settings;

    // prepend state to channel key and camel case
    let finalChannelKey = `${this.args.state}${channelKey
      .charAt(0)
      .toUpperCase()}${channelKey.slice(1)}`;

    let sorted = this.args.subscriptions.sortBy(finalChannelKey);
    if (channelDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }
}
