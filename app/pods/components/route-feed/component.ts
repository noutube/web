import ArrayProxy from '@ember/array';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import ChannelModel from 'noutube/models/channel';
import VideoModel from 'noutube/models/video';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    videos: ArrayProxy<VideoModel>;
    channels: ArrayProxy<ChannelModel>;
  };
}

export default class RouteFeedComponent extends Component<Signature> {
  @service declare router: RouterService;
  @service declare settings: SettingsService;

  @tracked showAddVideo = false;
  @tracked showSettings = false;

  get newChannels(): ChannelModel[] {
    return this.args.channels.filter((item) => item.hasNew);
  }
  get laterChannels(): ChannelModel[] {
    return this.args.channels.filter((item) => item.hasLater);
  }

  get newVideos(): VideoModel[] {
    return this.args.videos.filter((item) => item.new);
  }
  get laterVideos(): VideoModel[] {
    return this.args.videos.filter((item) => item.later);
  }

  get allVideos(): VideoModel[] {
    return this.args.videos.filter((item) => !item.deleted);
  }

  get anyVideos(): boolean {
    return this.allVideos.length > 0;
  }

  get titleNotification(): string {
    return this.newVideos.length > 0 ? `(${this.newVideos.length})` : '';
  }

  @action
  goToAccount(): void {
    this.router.transitionTo('account');
  }

  @action
  goToDeleted(): void {
    this.router.transitionTo('feed.deleted');
  }

  @action
  goToSubscriptions(): void {
    this.router.transitionTo('feed.subscriptions');
  }

  @action
  toggleAddVideo(): void {
    this.showAddVideo = !this.showAddVideo;
  }

  @action
  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteFeed: typeof RouteFeedComponent;
  }
}
