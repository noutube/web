import { service } from '@ember/service';
import JSONAPIAdapter from '@ember-data/adapter/json-api';

import config from 'noutube/config/environment';
import SessionService from 'noutube/services/session';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service declare session: SessionService;

  host = config.backendOrigin;

  get headers(): Record<string, string> {
    return this.session.headers;
  }
}
