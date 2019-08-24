import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RoutePrivacyComponent extends Component {
  @service session;

  showDestroyMe = false;

  @action
  toggleDestroyMe() {
    set(this, 'showDestroyMe', !this.showDestroyMe);
  }

  @action
  destroyMe() {
    return this.session.destroyMe();
  }
}
