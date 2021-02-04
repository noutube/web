import { inject as service } from '@ember/service';

import JSONAPIAdapter from '@ember-data/adapter/json-api';

import config from 'nou2ube/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  host = config.backendOrigin;

  get headers() {
    return {
      ...(this.session.me && {
        'X-User-Email': this.session.me.email,
        'X-User-Token': this.session.me.authenticationToken
      })
    };
  }
}
