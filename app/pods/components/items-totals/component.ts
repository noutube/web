import Component from '@glint/environment-ember-loose/glimmer-component';

import ItemModel from 'noutube/models/item';

interface Signature {
  Args: {
    items: ItemModel[];
  };
}

export default class ItemsTotalsComponent extends Component<Signature> {
  get totalDuration(): number {
    const videos = this.args.items.map((item) => item.video);
    const durations = videos.map((video) => video.duration);
    return durations.reduce((acc, n) => acc + n, 0);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ItemsTotals: typeof ItemsTotalsComponent;
  }
}
