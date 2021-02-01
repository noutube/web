import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import config from 'nou2ube/config/environment';

export default class UploadTakeoutComponent extends Component {
  @service store;

  @tracked inFlight = false;
  @tracked succeeded = false;
  @tracked failed = false;

  @action
  async selectFile(event) {
    this.inFlight = true;
    try {
      let { headers } = this.store.adapterFor('subscription');
      let response = await fetch(`${config.backendOrigin}/subscriptions/takeout`, {
        body: event.target.files[0],
        headers,
        method: 'POST'
      });
      if (!response.ok) {
        throw response.status;
      }
      this.succeeded = true;
    } catch (error) {
      this.failed = true;
    } finally {
      this.inFlight = false;
    }
  }
}
