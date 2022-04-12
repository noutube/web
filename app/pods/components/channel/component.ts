import { action } from '@ember/object';
import Component from '@glint/environment-ember-loose/glimmer-component';

import ChannelModel from 'noutube/models/channel';
import VideoModel from 'noutube/models/video';

interface Signature {
  Args: {
    channel: ChannelModel;
    state: 'new' | 'later';
  };
}

export default class ChannelComponent extends Component<Signature> {
  get new(): boolean {
    return this.args.state === 'new';
  }

  get videos(): VideoModel[] {
    if (this.new) {
      return this.args.channel.newVideos;
    } else {
      return this.args.channel.laterVideos;
    }
  }

  @action
  markAllLater(): void {
    this.videos.invoke('markLater');
  }

  @action
  ignoreAll(): void {
    this.videos.invoke('markDeleted');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Channel: typeof ChannelComponent;
  }
}
