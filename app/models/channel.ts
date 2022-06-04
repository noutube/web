import Model, { attr, hasMany } from '@ember-data/model';
import EmberArray from '@ember/array';
import { action } from '@ember/object';

import ApplicationAdapter from 'noutube/adapters/application';
import VideoModel from 'noutube/models/video';

export default class ChannelModel extends Model {
  @attr('string') declare apiId: string;
  @attr('string') declare title: string;
  @attr('string') declare thumbnail: string;
  @attr('boolean') declare isSubscribed: boolean;

  @hasMany('videos', { async: false })
  declare videos: EmberArray<VideoModel>;

  get newVideos(): VideoModel[] {
    return this.videos.filterBy('new');
  }
  get hasNew(): boolean {
    return this.newVideos.length > 0;
  }

  get laterVideos(): VideoModel[] {
    return this.videos.filterBy('later');
  }
  get hasLater(): boolean {
    return this.laterVideos.length > 0;
  }

  get deletedVideos(): VideoModel[] {
    return this.videos.filterBy('deleted');
  }
  get hasDeleted(): boolean {
    return this.deletedVideos.length > 0;
  }

  get sortableTitle(): string {
    return this.title.toLowerCase();
  }
  get newSortableTitle(): string {
    return this.sortableTitle;
  }
  get laterSortableTitle(): string {
    return this.sortableTitle;
  }
  get deletedSortableTitle(): string {
    return this.sortableTitle;
  }

  get newTotalDuration(): number {
    return this.newVideos.reduce((sum, video) => sum + video.duration, 0);
  }
  get laterTotalDuration(): number {
    return this.laterVideos.reduce((sum, video) => sum + video.duration, 0);
  }
  get deletedTotalDuration(): number {
    return this.deletedVideos.reduce((sum, video) => sum + video.duration, 0);
  }

  get newVideoCount(): number {
    return this.newVideos.length;
  }
  get laterVideoCount(): number {
    return this.laterVideos.length;
  }
  get deletedVideoCount(): number {
    return this.deletedVideos.length;
  }

  @action
  async subscribe(): Promise<void> {
    this.isSubscribed = true;
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }

  @action
  async unsubscribe(): Promise<void> {
    this.isSubscribed = false;
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    channel: ChannelModel;
    channels: ChannelModel;
  }
}

declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    channel: ApplicationAdapter;
  }
}
