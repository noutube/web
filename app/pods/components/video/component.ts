import { action } from '@ember/object';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SafeString } from 'handlebars';

import formatTime from 'noutube/lib/formatTime';
import VideoModel from 'noutube/models/video';
import PlayerService from 'noutube/services/player';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    video: VideoModel;
    play: () => void;
  };
}

export default class VideoComponent extends Component<Signature> {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;

  @tracked showSetProgress = false;

  get progressStyle(): SafeString {
    const { progress, duration } = this.args.video;
    return htmlSafe(`width: ${(progress / duration) * 100}%;`);
  }

  get formattedProgress(): string {
    return formatTime(this.args.video.progress);
  }

  get formattedDuration(): string {
    return formatTime(this.args.video.duration);
  }

  get playing(): boolean {
    return this.player.video === this.args.video;
  }

  @action
  async markLater(): Promise<void> {
    await this.args.video.markLater();
  }

  @action
  async markDeleted(): Promise<void> {
    if (this.playing) {
      this.player.stop();
    }
    await this.args.video.markDeleted();
  }

  @action
  toggleSetProgress(): void {
    this.showSetProgress = !this.showSetProgress;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Video: typeof VideoComponent;
  }
}
