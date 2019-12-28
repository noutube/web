import Component from '@ember/component';
import { inject as service } from '@ember/service';

import { classNames } from '@ember-decorators/component';

export default
@classNames('menu-bar')
class MenuBarComponent extends Component {
  @service session;
  @service theme;
}
