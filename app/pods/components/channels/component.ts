import { service } from '@ember/service';
import Component from '@glimmer/component';

import ChannelModel from 'noutube/models/channel';
import { State } from 'noutube/models/video';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    channels: ChannelModel[];
    state: State;
  };
}

export default class ChannelsComponent extends Component<Signature> {
  @service declare settings: SettingsService;

  get channelsSorted(): ChannelModel[] {
    const { channelKey, channelDir } = this.settings;

    // prepend state to channel key and camel case
    const finalChannelKey = `${this.args.state}${channelKey
      .charAt(0)
      .toUpperCase()}${channelKey.slice(1)}`;

    const sorted = this.args.channels.sortBy(finalChannelKey);
    if (channelDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Channels: typeof ChannelsComponent;
  }
}
