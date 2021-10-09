import { inject as service } from '@ember/service';
import Component from '@glint/environment-ember-loose/glimmer-component';

import SessionService from 'noutube/services/session';

interface Signature {
  Yields: {
    default: [];
  };
}

export default class RouteApplicationComponent extends Component<Signature> {
  @service declare session: SessionService;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteApplication: typeof RouteApplicationComponent;
  }
}
