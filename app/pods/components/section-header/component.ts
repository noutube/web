import Component from '@glint/environment-ember-loose/glimmer-component';

import { IconName } from 'nou2ube/pods/components/svg-icon/component';

interface Signature {
  Args: {
    icon?: IconName;
  };
  Yields: {
    default: [];
  };
}

export default class SectionHeaderComponent extends Component<Signature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionHeader: typeof SectionHeaderComponent;
  }
}
