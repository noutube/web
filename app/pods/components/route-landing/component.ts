import { inject as service } from '@ember/service';
import Component from '@glint/environment-ember-loose/glimmer-component';

import SessionService from 'nou2ube/services/session';

export default class RouteLandingComponent extends Component {
  @service declare session: SessionService;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteLanding: typeof RouteLandingComponent;
  }
}
