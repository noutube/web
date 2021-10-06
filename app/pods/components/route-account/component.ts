import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import SessionService from 'nou2ube/services/session';

export default class AccountComponent extends Component {
  @service declare session: SessionService;

  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';
  @tracked showDestroyMe = false;

  @action
  handlePassword(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement && this.session.me) {
      this.session.me.password = event.target.value;
      this.state = 'idle';
    }
  }

  @action
  async savePassword(): Promise<void> {
    if (!this.session.me) {
      return;
    }

    try {
      this.state = 'inFlight';
      await this.session.me.save();
      this.state = 'success';
    } catch (error) {
      this.state = 'failure';
    }
  }

  @action
  toggleDestroyMe(): void {
    this.showDestroyMe = !this.showDestroyMe;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Account: typeof AccountComponent;
  }
}
