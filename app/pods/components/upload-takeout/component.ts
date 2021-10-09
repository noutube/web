import Store from '@ember-data/store';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import config from 'nou2ube/config/environment';

export default class UploadTakeoutComponent extends Component {
  @service declare store: Store;

  @tracked inFlight = false;
  @tracked succeeded = false;
  @tracked failed = false;

  @action
  async selectFile(event: Event): Promise<void> {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    this.inFlight = true;
    try {
      const { headers } = this.store.adapterFor('subscription');
      if (!event.target.files) {
        throw 'no file';
      }
      const response = await fetch(
        `${config.backendOrigin}/subscriptions/takeout`,
        {
          body: event.target.files[0],
          headers,
          method: 'POST'
        }
      );
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    UploadTakeout: typeof UploadTakeoutComponent;
  }
}
