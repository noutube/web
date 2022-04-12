import ArrayProxy from '@ember/array';
import Component from '@glint/environment-ember-loose/glimmer-component';

import ChannelModel from 'noutube/models/channel';

interface Signature {
  Args: {
    channels: ArrayProxy<ChannelModel>;
  };
}

export default class ChannelsSummaryComponent extends Component<Signature> {
  get channelsSorted(): ChannelModel[] {
    return this.args.channels.sortBy('sortableTitle');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ChannelsSummary: typeof ChannelsSummaryComponent;
  }
}
