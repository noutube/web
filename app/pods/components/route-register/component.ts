import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import SessionService from 'nou2ube/services/session';

export default class RouteRegisterComponent extends Component {
  @service declare session: SessionService;

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
  async register(): Promise<void> {
    if (!this.valid) {
      return;
    }

    try {
      this.state = 'inFlight';
      await this.session.register(this.email, this.password);
      this.state = 'success';
    } catch (error) {
      this.state = 'failure';
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteRegister: typeof RouteRegisterComponent;
  }
}
