import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class SubscriptionsComponent extends Component {
  @service settings;

  @computed('args.state', 'settings.{channelKey,channelDir}')
  get channelSort() {
    let { channelKey, channelDir } = this.settings;

    // prepend state to channel key and camel case
    let finalChannelKey = `${this.args.state}${channelKey.charAt(0).toUpperCase()}${channelKey.slice(1)}`;

    return [`${finalChannelKey}:${channelDir}`];
  }

  @sort('args.subscriptions', 'channelSort') subscriptionsSorted;
}
