import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MenuBarComponent extends Component {
  @service session;
  @service theme;
}
