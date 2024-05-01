import { service } from '@ember/service';
import Component from '@glimmer/component';

import formatTime from 'noutube/lib/formatTime';
import VideoModel from 'noutube/models/video';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    videos: VideoModel[];
  };
}

export default class VideosTotalsComponent extends Component<Signature> {
  @service declare settings: SettingsService;

  get totalDuration(): number {
    return this.args.videos.reduce((sum, video) => sum + video.remaining, 0);
  }

  get totalDurationFormatted(): string {
    return formatTime(this.totalDuration);
  }

  get totalDurationAtSpeed(): number {
    const { channelSpeeds, speed } = this.settings;
    return this.args.videos
      .map(
        (video) =>
          video.remaining / (channelSpeeds[video.channel.apiId] ?? speed)
      )
      .reduce((sum, remaining) => sum + remaining, 0);
  }

  get totalDurationAtSpeedFormatted(): string {
    return formatTime(this.totalDurationAtSpeed);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    VideosTotals: typeof VideosTotalsComponent;
  }
}
