import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ItemsComponent extends Component {
  @service settings;

  @tracked autoplayId = null;

  get itemsSorted() {
    let { videoKey, videoDir } = this.settings;

    let sorted = this.args.items.sortBy(videoKey);
    if (videoDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }

  @action
  embedEnded(item) {
    let items = this.itemsSorted;
    this.autoplayId = items[items.indexOf(item) + 1]?.id;
  }

  @action
  embedToggled() {
    this.autoplayId = null;
  }
}
