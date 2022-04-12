import Store from '@ember-data/store';
import ArrayProxy from '@ember/array';
import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';

import ChannelModel from 'noutube/models/channel';
import SessionService from 'noutube/services/session';

export default class SubscriptionsRoute extends Route {
  @service declare router: RouterService;
  @service declare session: SessionService;
  @service declare store: Store;

  async beforeModel(transition: Transition): Promise<void> {
    if (!this.session.signedIn && !this.session.down) {
      this.router.transitionTo('landing');
    }
  }

  async model(): Promise<ArrayProxy<ChannelModel>> {
    return this.store.findAll('channel');
  }
}
