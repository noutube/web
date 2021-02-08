import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import ItemModel from 'nou2ube/models/item';
import SettingsService from 'nou2ube/services/settings';

interface Args {
  items: ItemModel[];
}

export default class ItemsComponent extends Component<Args> {
  @service declare settings: SettingsService;

  @tracked autoplayId: string | null = null;

  get itemsSorted(): ItemModel[] {
    const { videoKey, videoDir } = this.settings;

    const sorted = this.args.items.sortBy(videoKey);
    if (videoDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }

  @action
  embedEnded(item: ItemModel): void {
    const items = this.itemsSorted;
    this.autoplayId = items[items.indexOf(item) + 1]?.id;
  }

  @action
  embedToggled(): void {
    this.autoplayId = null;
  }
}
