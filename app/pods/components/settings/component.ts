import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import config from 'noutube/config/environment';
import SettingsService from 'noutube/services/settings';

const { themes, sizes, videoKeys, channelKeys, dirs, speeds } = config;

export default class SettingsComponent extends Component {
  @service declare settings: SettingsService;

  themes = themes;
  sizes = sizes;
  videoKeys = videoKeys;
  channelKeys = channelKeys;
  dirs = dirs;
  speeds = speeds;

  @action
  handleChange<
    K extends 'channelDir' | 'channelKey' | 'theme' | 'videoDir' | 'videoKey'
  >(key: K, event: Event) {
    this.settings[key] = (event.target as HTMLSelectElement)
      .value as SettingsService[K];
  }

  @action
  handleNumberChange<K extends 'size' | 'speed'>(key: K, event: Event) {
    this.settings[key] = parseFloat((event.target as HTMLSelectElement).value);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Settings: typeof SettingsComponent;
  }
}
