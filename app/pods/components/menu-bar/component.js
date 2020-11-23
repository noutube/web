import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MenuBarComponent extends Component {
  @service router;
  @service session;

  get isOnFeed() {
    return this.router.currentRouteName === 'feed';
  }
}
