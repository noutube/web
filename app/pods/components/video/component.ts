import { action } from '@ember/object';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { SafeString } from 'handlebars';

import VideoModel from 'noutube/models/video';
import PlayerService from 'noutube/services/player';
import SettingsService from 'noutube/services/settings';

const formatTime = (time: number): string => {
  const seconds = `00${time % 60}`.slice(-2);
  const minutes = `00${Math.floor(time / 60) % 60}`.slice(-2);
  if (time >= 60 * 60) {
    return `${Math.floor(time / 60 / 60)}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};

interface Signature {
  Args: {
    video: VideoModel;
    play: () => void;
  };
}

export default class VideoComponent extends Component<Signature> {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;

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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Video: typeof VideoComponent;
  }
}
