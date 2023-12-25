import { service } from '@ember/service';
import Component from '@glimmer/component';

import MenuBarService from 'noutube/services/menu-bar';

interface Signature {
  Blocks: {
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
