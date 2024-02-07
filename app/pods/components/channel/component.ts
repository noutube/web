import { action } from '@ember/object';
import Component from '@glimmer/component';

import ChannelModel from 'noutube/models/channel';
import VideoModel, { State } from 'noutube/models/video';

interface Signature {
  Args: {
    channel: ChannelModel;
    state: State;
  };
}

export default class ChannelComponent extends Component<Signature> {
  get new(): boolean {
    return this.args.state === 'new';
  }

  get later(): boolean {
    return this.args.state === 'later';
  }

  get deleted(): boolean {
    return this.args.state === 'deleted';
  }

  get videos(): VideoModel[] {
    if (this.new) {
      return this.args.channel.newVideos;
    } else if (this.later) {
      return this.args.channel.laterVideos;
    } else {
      return this.args.channel.deletedVideos;
    }
  }

  @action
  markAllLater(): void {
    this.videos.forEach((item) => item.markLater());
  }

  @action
  ignoreAll(): void {
    this.videos.forEach((item) => item.markDeleted());
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Channel: typeof ChannelComponent;
  }
}
