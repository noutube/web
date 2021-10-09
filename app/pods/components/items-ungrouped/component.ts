import Component from '@glint/environment-ember-loose/glimmer-component';

import ItemModel from 'noutube/models/item';

interface Signature {
  Args: {
    items: ItemModel[];
  };
}

export default class ItemsUngroupedComponent extends Component<Signature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ItemsUngrouped: typeof ItemsUngroupedComponent;
  }
}
