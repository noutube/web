import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ItemsComponent extends Component {
  @service settings;

  get itemsSorted() {
    let { videoKey, videoDir } = this.settings;

    let sorted = this.args.items.sortBy(videoKey);
    if (videoDir === 'desc') {
      sorted.reverse();
    }
    return sorted;
  }
}
