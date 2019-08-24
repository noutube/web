import Component from '@ember/component';
import { sort } from '@ember/object/computed';

import { storageFor } from 'ember-local-storage';

export default class DisplayItemsComponent extends Component {
  @storageFor('settings') settings;

  items = null;

  @sort('items', 'settings.videoSort') itemsSorted;
}
