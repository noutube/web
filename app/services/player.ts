import { action } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import ItemModel from 'noutube/models/item';
import SettingsService from 'noutube/services/settings';

export default class PlayerService extends Service {
  @service declare settings: SettingsService;

  @tracked item: ItemModel | null = null;
  onPlayEnded: (item: ItemModel) => ItemModel | null = () => null;

  @action
  embedEnded(): void {
    if (this.settings.autoplay && this.item) {
      const next = this.onPlayEnded(this.item);
      if (next) {
        this.item = next;
      } else {
        this.stop();
      }
    }
  }

  @action
  stop(): void {
    this.item = null;
    this.onPlayEnded = () => null;
  }
}
