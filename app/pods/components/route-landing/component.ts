import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import SessionService from 'noutube/services/session';

export default class RouteLandingComponent extends Component {
  @service declare router: RouterService;
  @service declare session: SessionService;

  @action
  goToFeed(): void {
    this.router.transitionTo('feed');
  }

  @action
  goToRegister(): void {
    this.router.transitionTo('register');
  }

  @action
  goToSignIn(): void {
    this.router.transitionTo('sign-in');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteLanding: typeof RouteLandingComponent;
  }
}
