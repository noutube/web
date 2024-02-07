import Component from '@glimmer/component';

import { IconName } from 'noutube/pods/components/svg-icon/component';

interface Signature {
  Args: {
    icon: IconName;
    onClick: () => void;
    title: string;
  };
}

export default class MenuBarButtonComponent extends Component<Signature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'MenuBar::Button': typeof MenuBarButtonComponent;
  }
}
