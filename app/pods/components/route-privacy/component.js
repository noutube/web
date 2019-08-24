import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RoutePrivacyComponent extends Component {
  @service session;

  @tracked showDestroyMe = false;

  @action
  toggleDestroyMe() {
    this.showDestroyMe = !this.showDestroyMe;
  }

  @action
  destroyMe() {
    return this.session.destroyMe();
  }
}
