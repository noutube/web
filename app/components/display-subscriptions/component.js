import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { sort } from '@ember/object/computed';

import { storageFor } from 'ember-local-storage';

export default class DisplaySubscriptionsComponent extends Component {
  @storageFor('settings') settings;

  state = null;
  subscriptions = null;

  @computed('state', 'settings.{channelKey,channelDir}')
  get channelSort() {
    let channelKey = get(this.settings, 'channelKey');
    let channelDir = get(this.settings, 'channelDir');

    // prepend state to channel key and camel case
    let finalChannelKey = `${this.state}${channelKey.charAt(0).toUpperCase()}${channelKey.slice(1)}`;

    return [`${finalChannelKey}:${channelDir}`];
  }

  @sort('subscriptions', 'channelSort') subscriptionsSorted;
}
