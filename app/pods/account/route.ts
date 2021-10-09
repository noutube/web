import Store from '@ember-data/store';
import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';

import User from 'noutube/models/user';
import SessionService from 'noutube/services/session';

export default class AccountRoute extends Route {
  @service declare router: RouterService;
  @service declare session: SessionService;
  @service declare store: Store;

  async beforeModel(transition: Transition): Promise<void> {
    if (!this.session.signedIn && !this.session.down) {
      this.router.transitionTo('landing');
    }
  }

  deactivate(): void {
    const user = this.modelFor('account');
    user.unloadRecord();
  }

  async model(): Promise<User> {
    const { id } = this.session;
    if (id) {
      return this.store.findRecord('user', id);
    } else {
      throw new Error('tried to load account model without user id');
    }
  }
}
