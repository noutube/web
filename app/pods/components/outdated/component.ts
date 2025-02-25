import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import RevisionService from 'noutube/services/revision';

export default class OutdatedComponent extends Component {
  @service declare revision: RevisionService;

  @action
  refresh() {
    window.location.reload();
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Outdated: typeof OutdatedComponent;
  }
}
