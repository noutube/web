import Route from '@ember/routing/route';
import Transition from '@ember/routing/-private/transition';
import { inject as service } from '@ember/service';

import SessionService from 'nou2ube/services/session';

export default class IndexRoute extends Route {
  @service declare session: SessionService;

  async beforeModel(transition: Transition): Promise<void> {
    if (this.session.me || this.session.down) {
      this.transitionTo('feed');
    } else {
      this.transitionTo('landing');
    }
  }
}
