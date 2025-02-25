import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

import RevisionService from 'noutube/services/revision';
import SessionService from 'noutube/services/session';
import SettingsService from 'noutube/services/settings';

export default class ApplicationRoute extends Route {
  @service declare revision: RevisionService;
  @service declare session: SessionService;
  @service declare settings: SettingsService;

  async beforeModel(transition: Transition): Promise<void> {
    this.settings.applyTheme();
    await this.session.restore();
    this.revision.start();
  }
}
