import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import SessionService from 'noutube/services/session';

export default class RouteSignInComponent extends Component {
  @service declare router: RouterService;
  @service declare session: SessionService;

  @tracked email = '';
  @tracked password = '';
  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';

  get valid(): boolean {
    return !!this.email && !!this.password;
  }

  @action
  handleEmail(email: string): void {
    this.email = email;
    this.state = 'idle';
  }

  @action
  handlePassword(password: string): void {
    this.password = password;
    this.state = 'idle';
  }

  @action
  async signIn(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.valid) {
      return;
    }

    try {
      this.state = 'inFlight';
      await this.session.signIn(this.email, this.password);
      this.state = 'success';
      this.router.transitionTo('feed');
    } catch (error) {
      this.state = 'failure';
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteSignIn: typeof RouteSignInComponent;
  }
}
