import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service settings;

  async beforeModel(transition) {
    this.settings.applyTheme();
    await this.session.restore();
  }
}
