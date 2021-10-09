import { InvalidError, errorsArrayToHash } from '@ember-data/adapter/error';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import User from 'nou2ube/models/user';
import SessionService from 'nou2ube/services/session';

interface Signature {
  Args: {
    user: User;
  };
}

export default class AccountComponent extends Component<Signature> {
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
  toggleDestroyUser(): void {
    this.showDestroyUser = !this.showDestroyUser;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Account: typeof AccountComponent;
  }
}
