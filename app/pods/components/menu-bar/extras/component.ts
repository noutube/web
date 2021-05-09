import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import MenuBarService from 'nou2ube/services/menu-bar';

export default class MenuBarExtrasComponent extends Component {
  @service declare menuBar: MenuBarService;
}
