import { inject as service } from '@ember/service';
import JSONAPIAdapter from '@ember-data/adapter/json-api';

import config from 'nou2ube/config/environment';
import SessionService from 'nou2ube/services/session';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service declare session: SessionService;

  host = config.backendOrigin;

  get headers(): Record<string, string> {
    return {
      ...(this.session.me && {
        'X-User-Email': this.session.me.email,
        'X-User-Token': this.session.me.authenticationToken
      })
    };
  }
}
