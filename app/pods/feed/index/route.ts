import Route from '@ember/routing/route';

import { Model } from 'noutube/pods/feed/route';

export default class FeedIndexRoute extends Route {
  model(): Promise<Model> {
    return this.modelFor('feed');
  }
}
