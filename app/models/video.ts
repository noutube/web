import Model, { attr, belongsTo } from '@ember-data/model';

import ChannelModel from 'noutube/models/channel';

export default class VideoModel extends Model {
  @attr('string') declare apiId: string;
  @attr('string') declare title: string;
  @attr('string') declare thumbnail: string;
  @attr('number') declare duration: number;
  @attr('date') declare publishedAt: Date;
  @attr('boolean') declare isLive: boolean;
  @attr('boolean') declare isLiveContent: boolean;
  @attr('boolean') declare isUpcoming: boolean;
  @attr('date') declare scheduledAt: Date | null;
  @attr('string') declare state: 'state_new' | 'state_later';

  @belongsTo('channel', { async: false })
  declare channel: ChannelModel;

  get showAt(): Date {
    return this.scheduledAt ?? this.publishedAt;
  }

  get new(): boolean {
    return this.state === 'state_new' && !this.isDeleted;
  }

  get later(): boolean {
    return this.state === 'state_later' && !this.isDeleted;
  }

  get age(): number {
    return Date.now() - this.showAt.getTime();
  }

  get sortableTitle(): string {
    return this.title.toLowerCase();
  }

  async markLater(): Promise<void> {
    this.state = 'state_later';
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }

  async markDeleted(): Promise<void> {
    this.deleteRecord();
    try {
      await this.save();
      this.unloadRecord();
    } catch {
      this.rollbackAttributes();
    }
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    video: VideoModel;
    videos: VideoModel;
  }
}
