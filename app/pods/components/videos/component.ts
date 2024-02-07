import { action } from '@ember/object';
import { service } from '@ember/service';
import { compare } from '@ember/utils';
import Component from '@glimmer/component';

import VideoModel from 'noutube/models/video';
import PlayerService from 'noutube/services/player';
import SettingsService from 'noutube/services/settings';

interface Signature {
  Args: {
    videos: VideoModel[];
  };
}

export default class VideosComponent extends Component<Signature> {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;

  get videosSorted(): VideoModel[] {
    const { videoKey, videoDir } = this.settings;

    const sorted = [...this.args.videos].sort((a, b) =>
      compare(a[videoKey], b[videoKey])
    );
    if (videoDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }

  @action
  play(video: VideoModel): void {
    this.player.video = video;
    this.player.onPlayEnded = this.playEnded;
  }

  @action
  playEnded(video: VideoModel): VideoModel | null {
    const videos = this.videosSorted;
    const next = videos.indexOf(video) + 1;
    if (next > 0 && next < videos.length) {
      return videos[next];
    } else {
      return null;
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Videos: typeof VideosComponent;
  }
}
