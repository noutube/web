import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

import PlayerService from 'noutube/services/player';
import SettingsService from 'noutube/services/settings';

export default class PlayerComponent extends Component {
  @service declare player: PlayerService;
  @service declare settings: SettingsService;

  @tracked auto = false;

  get channelApiId(): string | undefined {
    return this.player.video?.channel.apiId;
  }

  get speed(): number {
    const { channelApiId } = this;
    if (!channelApiId) {
      return this.settings.speed;
    }

    return this.settings.channelSpeeds[channelApiId] ?? this.settings.speed;
  }

  @action
  playbackRateChanged(rate: number): void {
    const { channelApiId } = this;
    if (!channelApiId) {
      return;
    }

    if (rate === this.settings.speed) {
      const { [channelApiId]: oldSpeed, ...channelSpeeds } =
        this.settings.channelSpeeds;
      this.settings.channelSpeeds = channelSpeeds;
    } else {
      this.settings.channelSpeeds = {
        ...this.settings.channelSpeeds,
        [channelApiId]: rate
      };
    }
  }

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
