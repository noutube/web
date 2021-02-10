import Route from '@ember/routing/route';
import Transition from '@ember/routing/-private/transition';
import { inject as service } from '@ember/service';

import SessionService from 'nou2ube/services/session';
import SettingsService from 'nou2ube/services/settings';

export default class ApplicationRoute extends Route {
  @service declare session: SessionService;
  @service declare settings: SettingsService;

  async beforeModel(transition: Transition): Promise<void> {
    this.settings.applyTheme();
    await this.session.restore();
  }
}
