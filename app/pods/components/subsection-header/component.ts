import Component from '@glimmer/component';

import { IconName } from 'noutube/pods/components/svg-icon/component';

interface Signature {
  Args: {
    icon?: IconName;
  };
  Blocks: {
    default: [];
  };
}

export default class SubsectionHeaderComponent extends Component<Signature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SubsectionHeader: typeof SubsectionHeaderComponent;
  }
}
