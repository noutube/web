import { action } from '@ember/object';
import { debounce, throttle } from '@ember/runloop';
import Model, { attr, belongsTo } from '@ember-data/model';

import ChannelModel from 'noutube/models/channel';

const SAVE_PROGRESS_INTERVAL = 5000;

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
  @attr('number') declare progress: number;

  @belongsTo('channel', { async: false, inverse: 'videos' })
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

  get url(): string {
    return `https://www.youtube.com/watch?v=${this.apiId}${this.progress ? `&t=${this.progress}` : ''}`;
  }

  get remaining(): number {
    return this.duration - this.progress;
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

  rateLimitedUpdateProgress(progress: number): void {
    this.progress = progress;
    debounce(this, this.saveProgressDebounce, SAVE_PROGRESS_INTERVAL);
    throttle(this, this.saveProgressThrottle, SAVE_PROGRESS_INTERVAL);
  }

  @action
  saveProgressDebounce(): void {
    this.save();
  }

  @action
  saveProgressThrottle(): void {
    this.save();
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    video: VideoModel;
    videos: VideoModel;
  }
}
