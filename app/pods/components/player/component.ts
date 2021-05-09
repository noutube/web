import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import PlayerService from 'nou2ube/services/player';
import SettingsService from 'nou2ube/services/settings';

export default class PlayerComponent extends Component {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;
}
