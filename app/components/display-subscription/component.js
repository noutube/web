import Component from '@ember/component';
import { action, computed } from '@ember/object';

import { classNames } from '@ember-decorators/component';

export default
@classNames('subscription')
class DisplaySubscriptionComponent extends Component {
  subscription = null;
  state = null;

  @computed('state')
  get new() {
    return this.state === 'new';
  }

  // can't filterBy a bound key, do it manually
  @computed('subscription.items.@each.{new,later}', 'state')
  get items() {
    return this.subscription.items.filterBy(this.state);
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
