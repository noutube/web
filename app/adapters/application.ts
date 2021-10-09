import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';

import config from 'noutube/config/environment';
import SessionService from 'noutube/services/session';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service declare session: SessionService;

  host = config.backendOrigin;

  get headers(): Record<string, string> {
    return {
      ...(this.session.token && {
        Authorization: `Bearer ${this.session.token}`
      })
    };
  }
}
