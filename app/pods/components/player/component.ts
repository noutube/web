import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import PlayerService from 'nou2ube/services/player';
import SettingsService from 'nou2ube/services/settings';

export default class PlayerComponent extends Component {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;

  @tracked auto = false;

  @action
  toggleAuto(): void {
    this.auto = !this.auto;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Player: typeof PlayerComponent;
  }
}
