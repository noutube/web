import { action } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import VideoModel from 'noutube/models/video';
import SettingsService from 'noutube/services/settings';

export default class PlayerService extends Service {
  @service declare settings: SettingsService;

  @tracked video: VideoModel | null = null;
  onPlayEnded: (video: VideoModel) => VideoModel | null = () => null;

  @action
  embedEnded(): void {
    if (this.settings.autoplay && this.video) {
      const next = this.onPlayEnded(this.video);
      if (next) {
        this.video = next;
      } else {
        this.stop();
      }
    }
  }

  @action
  stop(): void {
    this.video = null;
    this.onPlayEnded = () => null;
  }
}
