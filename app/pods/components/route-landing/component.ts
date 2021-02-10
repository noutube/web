import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import SessionService from 'nou2ube/services/session';

export default class RouteLandingComponent extends Component {
  @service declare session: SessionService;
}
