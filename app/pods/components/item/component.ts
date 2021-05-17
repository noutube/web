import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import ItemModel from 'nou2ube/models/item';
import PlayerService from 'nou2ube/services/player';
import SettingsService from 'nou2ube/services/settings';

interface Args {
  item: ItemModel;
  play: (item: ItemModel) => void;
}

export default class ItemComponent extends Component<Args> {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;

  get formattedDuration(): string {
    const { duration } = this.args.item.video;
    const seconds = `00${duration % 60}`.slice(-2);
    const minutes = `00${Math.floor(duration / 60) % 60}`.slice(-2);
    if (duration >= 60 * 60) {
      return `${Math.floor(duration / 60 / 60)}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  }

  get playing(): boolean {
    return this.player.item === this.args.item;
  }

  @action
  async markLater(): Promise<void> {
    await this.args.item.markLater();
  }

  @action
  async markDeleted(): Promise<void> {
    if (this.playing) {
      this.player.stop();
    }
    await this.args.item.markDeleted();
  }
}
