import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import Component from '@glint/environment-ember-loose/glimmer-component';

import MenuBarService from 'nou2ube/services/menu-bar';
import SessionService from 'nou2ube/services/session';

export default class MenuBarComponent extends Component {
  @service declare menuBar: MenuBarService;
  @service declare router: RouterService;
  @service declare session: SessionService;

  get isOnFeed(): boolean {
    return this.router.currentRouteName === 'feed';
  }

  @action
  clearExtras(): void {
    this.menuBar.extrasElement = null;
  }

  @action
  goToFeed(): void {
    this.router.transitionTo('feed');
  }

  @action
  setExtras(element: Element | null): void {
    this.menuBar.extrasElement = element;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    MenuBar: typeof MenuBarComponent;
  }
}
