import ArrayProxy from '@ember/array';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

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
    return this.args.channels.filterBy('hasNew');
  }
  get laterChannels(): ChannelModel[] {
    return this.args.channels.filterBy('hasLater');
  }

  get newVideos(): VideoModel[] {
    return this.args.videos.filterBy('new');
  }
  get laterVideos(): VideoModel[] {
    return this.args.videos.filterBy('later');
  }

  get allVideos(): VideoModel[] {
    return this.args.videos.filterBy('deleted', false);
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
  goToSubscriptions(): void {
    this.router.transitionTo('subscriptions');
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
