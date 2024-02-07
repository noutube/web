import { service } from '@ember/service';
import { compare } from '@ember/utils';
import Component from '@glimmer/component';

import { ChannelKey } from 'noutube/config/environment';
import ChannelModel from 'noutube/models/channel';
import { State } from 'noutube/models/video';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    channels: ChannelModel[];
    state: State;
  };
}

// combine state and channel key to produce channel model property
const stateChannelKey = (
  state: State,
  channelKey: ChannelKey
): keyof ChannelModel => {
  switch (state) {
    case 'new':
      switch (channelKey) {
        case 'sortableTitle':
          return 'newSortableTitle';
        case 'totalDuration':
          return 'newTotalDuration';
        case 'videoCount':
          return 'newVideoCount';
      }
      break;
    case 'later':
      switch (channelKey) {
        case 'sortableTitle':
          return 'laterSortableTitle';
        case 'totalDuration':
          return 'laterTotalDuration';
        case 'videoCount':
          return 'laterVideoCount';
      }
      break;
    case 'deleted':
      switch (channelKey) {
        case 'sortableTitle':
          return 'deletedSortableTitle';
        case 'totalDuration':
          return 'deletedTotalDuration';
        case 'videoCount':
          return 'deletedVideoCount';
      }
      break;
  }
};

export default class ChannelsComponent extends Component<Signature> {
  @service declare settings: SettingsService;

  get channelsSorted(): ChannelModel[] {
    const { channelKey, channelDir } = this.settings;

    const finalChannelKey = stateChannelKey(this.args.state, channelKey);

    const sorted = [...this.args.channels].sort((a, b) =>
      compare(a[finalChannelKey], b[finalChannelKey])
    );
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
