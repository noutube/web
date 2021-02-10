import Service from '@ember/service';

import Consumer from '@algonauti/ember-cable/-private/consumer';

declare class CableService extends Service {
  createConsumer(url: string): Consumer;
}

export default CableService;
