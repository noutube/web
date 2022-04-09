import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glint/environment-ember-loose/glimmer-component';

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

  get formattedDuration(): string {
    const { duration } = this.args.video;
    const seconds = `00${duration % 60}`.slice(-2);
    const minutes = `00${Math.floor(duration / 60) % 60}`.slice(-2);
    if (duration >= 60 * 60) {
      return `${Math.floor(duration / 60 / 60)}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
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
