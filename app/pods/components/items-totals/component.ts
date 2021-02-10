import Component from '@glimmer/component';

import ItemModel from 'nou2ube/models/item';

interface Args {
  items: ItemModel[];
}

export default class ItemsTotals extends Component<Args> {
  get totalDuration(): number {
    const videos = this.args.items.map((item) => item.video);
    const durations = videos.map((video) => video.duration);
    return durations.reduce((acc, n) => acc + n, 0);
  }
}
