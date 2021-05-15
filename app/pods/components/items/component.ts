import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import ItemModel from 'nou2ube/models/item';
import PlayerService from 'nou2ube/services/player';
import SettingsService from 'nou2ube/services/settings';

interface Args {
  items: ItemModel[];
}

export default class ItemsComponent extends Component<Args> {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;

  get itemsSorted(): ItemModel[] {
    const { videoKey, videoDir } = this.settings;

    const sorted = this.args.items.sortBy(videoKey);
    if (videoDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }

  @action
  play(item: ItemModel): void {
    this.player.item = item;
    this.player.onPlayEnded = this.playEnded;
  }

  @action
  playEnded(item: ItemModel): ItemModel | null {
    const items = this.itemsSorted;
    const next = items.indexOf(item) + 1;
    if (next > 0 && next < items.length) {
      return items[next];
    } else {
      return null;
    }
  }
}
