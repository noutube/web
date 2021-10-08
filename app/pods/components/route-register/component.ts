import Store from '@ember-data/store';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import SessionService from 'nou2ube/services/session';

export default class RouteRegisterComponent extends Component {
  @service declare session: SessionService;
  @service declare store: Store;

  @tracked email = '';
  @tracked password = '';
  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';

  get valid(): boolean {
    return !!this.email && !!this.password;
  }

  @action
  handleEmail(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.email = event.target.value;
      this.state = 'idle';
    }
  }

  @action
  handlePassword(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.password = event.target.value;
      this.state = 'idle';
    }
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
    } catch (error) {
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
