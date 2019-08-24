import Component from '@glimmer/component';
import { computed, get } from '@ember/object';
import { sort } from '@ember/object/computed';

import { storageFor } from 'ember-local-storage';

export default class DisplaySubscriptionsComponent extends Component {
  @storageFor('settings') settings;

  @computed('args.state', 'settings.{channelKey,channelDir}')
  get channelSort() {
    let channelKey = get(this.settings, 'channelKey');
    let channelDir = get(this.settings, 'channelDir');

    // prepend state to channel key and camel case
    let finalChannelKey = `${this.args.state}${channelKey.charAt(0).toUpperCase()}${channelKey.slice(1)}`;

    return [`${finalChannelKey}:${channelDir}`];
  }

  @sort('args.subscriptions', 'channelSort') subscriptionsSorted;
}
