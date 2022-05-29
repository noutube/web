import Model, { attr, belongsTo } from '@ember-data/model';

import ChannelModel from 'noutube/models/channel';

export type State = 'new' | 'later' | 'deleted';

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
  @attr('string') declare state: State;

  @belongsTo('channel', { async: false })
  declare channel: ChannelModel;

  get showAt(): Date {
    return this.scheduledAt ?? this.publishedAt;
  }

  get new(): boolean {
    return this.state === 'new';
  }

  get later(): boolean {
    return this.state === 'later';
  }

  get deleted(): boolean {
    return this.state === 'deleted';
  }

  get age(): number {
    return Date.now() - this.showAt.getTime();
  }

  get sortableTitle(): string {
    return this.title.toLowerCase();
  }

  async markLater(): Promise<void> {
    this.state = 'later';
    try {
      await this.save();
    } catch {
      this.rollbackAttributes();
    }
  }

  async markDeleted(): Promise<void> {
    this.state = 'deleted';
    try {
      await this.save();
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
