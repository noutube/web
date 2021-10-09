import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';

import SessionService from 'noutube/services/session';

export default class RegisterRoute extends Route {
  @service declare router: RouterService;
  @service declare session: SessionService;

  async beforeModel(transition: Transition): Promise<void> {
    if (this.session.signedIn || this.session.down) {
      this.router.transitionTo('feed');
    }
  }
}
