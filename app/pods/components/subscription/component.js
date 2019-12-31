import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SubscriptionComponent extends Component {
  get new() {
    return this.args.state === 'new';
  }

  get items() {
    if (this.new) {
      return this.args.subscription.newItems;
    } else {
      return this.args.subscription.laterItems;
    }
  }

  @action
  markAllLater() {
    this.items.invoke('markLater');
  }

  @action
  ignoreAll() {
    this.items.invoke('markDeleted');
  }
}
