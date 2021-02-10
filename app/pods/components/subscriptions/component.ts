import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import SubscriptionModel from 'nou2ube/models/subscription';
import SettingsService from 'nou2ube/services/settings';

interface Args {
  subscriptions: SubscriptionModel[];
  state: 'new' | 'later';
}

export default class SubscriptionsComponent extends Component<Args> {
  @service declare settings: SettingsService;

  get subscriptionsSorted(): SubscriptionModel[] {
    const { channelKey, channelDir } = this.settings;

    // prepend state to channel key and camel case
    const finalChannelKey = `${this.args.state}${channelKey
      .charAt(0)
      .toUpperCase()}${channelKey.slice(1)}`;

    const sorted = this.args.subscriptions.sortBy(finalChannelKey);
    if (channelDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }
}
