import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import SessionService from 'nou2ube/services/session';

export default class RoutePrivacyComponent extends Component {
  @service declare session: SessionService;

  @tracked showDestroyMe = false;

  @action
  toggleDestroyMe(): void {
    this.showDestroyMe = !this.showDestroyMe;
  }

  @action
  destroyMe(): Promise<void> {
    return this.session.destroyMe();
  }
}
