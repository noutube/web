import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import { IconName } from 'noutube/pods/components/svg-icon/component';

interface Signature {
  Args: {
    backIcon?: IconName;
    backRoute?: string;
    icon?: IconName;
  };
  Blocks: {
    default: [];
  };
}

export default class SectionHeaderComponent extends Component<Signature> {
  @service declare router: RouterService;

  @action
  goBack(): void {
    if (this.args.backRoute) {
      this.router.transitionTo(this.args.backRoute);
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SectionHeader: typeof SectionHeaderComponent;
  }
}
