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

  @tracked showDestroyUser = false;
  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';

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
  handlePassword(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.args.user.password = event.target.value;
      this.state = 'idle';
    }
  }

  @action
  async savePassword(): Promise<void> {
    try {
      this.state = 'inFlight';
      await this.args.user.save();
      this.state = 'success';
    } catch (error) {
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
