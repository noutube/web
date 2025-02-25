import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import config from 'noutube/config/environment';

export default class RevisionService extends Service {
  @tracked latestRevision = config.revision;

  get outdated(): boolean {
    return this.latestRevision !== config.revision;
  }

  start(): void {
    console.log('[revision] current', config.revision);
    if (config.revision === 'dev') {
      return;
    }

    document.addEventListener('visibilitychange', this.reloadRevision);
    this.reloadRevision();
  }

  @action
  async reloadRevision(): Promise<void> {
    if (document.hidden) {
      return;
    }

    const response = await fetch('/revision.json');
    if (!response.ok) {
      console.warn('[revision] latest failed', response.status);
      return;
    }

    const { revision } = await response.json();
    console.log('[revision] latest', revision);
    this.latestRevision = revision;
  }
}
