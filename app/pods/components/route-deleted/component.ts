import ArrayProxy from '@ember/array';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import ChannelModel from 'noutube/models/channel';
import VideoModel from 'noutube/models/video';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    videos: ArrayProxy<VideoModel>;
    channels: ArrayProxy<ChannelModel>;
  };
}

export default class RouteDeletedComponent extends Component<Signature> {
  @service declare settings: SettingsService;

  get deletedChannels(): ChannelModel[] {
    return this.args.channels.filterBy('hasDeleted');
  }

  get deletedVideos(): VideoModel[] {
    return this.args.videos.filterBy('deleted');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteDeleted: typeof RouteDeletedComponent;
  }
}
