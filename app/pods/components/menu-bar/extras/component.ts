import { inject as service } from '@ember/service';
import Component from '@glint/environment-ember-loose/glimmer-component';

import MenuBarService from 'nou2ube/services/menu-bar';

interface Signature {
  Yields: {
    default: [];
  };
}

export default class MenuBarExtrasComponent extends Component<Signature> {
  @service declare menuBar: MenuBarService;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'MenuBar::Extras': typeof MenuBarExtrasComponent;
  }
}
