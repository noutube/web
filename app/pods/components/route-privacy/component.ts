import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RoutePrivacy: typeof RoutePrivacyComponent;
  }
}
