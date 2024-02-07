import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { InvalidError } from '@ember-data/adapter/error';
import Store from '@ember-data/store';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { errorsArrayToHash } from 'noutube/lib/adapterError';
import SessionService from 'noutube/services/session';

export default class RouteRegisterComponent extends Component {
  @service declare router: RouterService;
  @service declare session: SessionService;
  @service declare store: Store;

  @tracked email = '';
  @tracked errors: Record<string, unknown[]> = {};
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
  async register(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.valid) {
      return;
    }

    const user = this.store.createRecord('user');
    try {
      this.state = 'inFlight';
      user.email = this.email;
      user.password = this.password;
      await user.save();
      await this.session.signIn(this.email, this.password);
      this.state = 'success';
      this.router.transitionTo('feed');
    } catch (error) {
      if (error instanceof InvalidError) {
        this.errors = errorsArrayToHash(error.errors);
      } else {
        this.errors = {};
      }
      this.state = 'failure';
    } finally {
      user.unloadRecord();
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteRegister: typeof RouteRegisterComponent;
  }
}
