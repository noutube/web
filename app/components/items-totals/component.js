import Component from '@ember/component';
import { computed, get } from '@ember/object';

import { tagName } from '@ember-decorators/component';

export default
@tagName('p')
class ItemsTotals extends Component {
  items = null;

  @computed('items')
  get totalDuration() {
    return this.items.map((item) => get(item.video, 'duration')).reduce((acc, n) => acc + n, 0);
  }
}
