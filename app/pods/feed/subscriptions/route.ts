import Route from '@ember/routing/route';

import { Model } from 'noutube/pods/feed/route';

export default class SubscriptionsRoute extends Route {
  model(): Model {
    return this.modelFor('feed') as Model;
  }
}
