import Component from '@glimmer/component';
import { computed, get } from '@ember/object';

export default class ItemsTotals extends Component {
  @computed('args.items')
  get totalDuration() {
    return this.args.items.map((item) => get(item.video, 'duration')).reduce((acc, n) => acc + n, 0);
  }
}
