import Component from '@glimmer/component';
import { sort } from '@ember/object/computed';

import { storageFor } from 'ember-local-storage';

export default class DisplayItemsComponent extends Component {
  @storageFor('settings') settings;

  @sort('args.items', 'settings.videoSort') itemsSorted;
}
