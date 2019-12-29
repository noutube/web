import Component from '@glimmer/component';
import { action, computed } from '@ember/object';

export default class SubscriptionComponent extends Component {
  @computed('args.state')
  get new() {
    return this.args.state === 'new';
  }

  // can't filterBy a bound key, do it manually
  @computed('args.subscription.items.@each.{new,later}', 'args.state')
  get items() {
    return this.args.subscription.items.filterBy(this.args.state);
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
