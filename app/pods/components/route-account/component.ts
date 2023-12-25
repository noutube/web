import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { InvalidError, errorsArrayToHash } from '@ember-data/adapter/error';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import User from 'noutube/models/user';
import SessionService from 'noutube/services/session';

interface Signature {
  Args: {
    user: User;
  };
}

export default class RouteAccountComponent extends Component<Signature> {
  @service declare router: RouterService;
  @service declare session: SessionService;

  @tracked errors: Record<string, string> = {};
  @tracked password = '';
  @tracked showDestroyUser = false;
  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';

  get valid(): boolean {
    return !!this.password;
  }

  @action
  async destroyUser(): Promise<void> {
    try {
      this.args.user.deleteRecord();
      await this.args.user.save();
      this.session.signOut();
      this.router.transitionTo('landing');
    } catch (error) {
      this.args.user.rollbackAttributes();
    }
  }

  @action
  handlePassword(password: string): void {
    this.password = password;
    this.state = 'idle';
  }

  @action
  async savePassword(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.valid) {
      return;
    }

    try {
      this.state = 'inFlight';
      this.args.user.password = this.password;
      await this.args.user.save();
      this.state = 'success';
    } catch (error) {
      if (error instanceof InvalidError) {
        this.errors = errorsArrayToHash(error.errors);
      } else {
        this.errors = {};
      }
      this.args.user.rollbackAttributes();
      this.state = 'failure';
    }
  }

  @action
  signOut(): void {
    this.session.signOut();
    this.router.transitionTo('landing');
  }

  @action
  toggleDestroyUser(): void {
    this.showDestroyUser = !this.showDestroyUser;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteAccount: typeof RouteAccountComponent;
  }
}
