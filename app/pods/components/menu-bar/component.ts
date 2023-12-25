import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import MenuBarService from 'noutube/services/menu-bar';

export default class MenuBarComponent extends Component {
  @service declare menuBar: MenuBarService;

  @action
  clearExtras(): void {
    this.menuBar.extrasElement = null;
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
