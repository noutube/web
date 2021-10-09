import { inject as service } from '@ember/service';
import Component from '@glint/environment-ember-loose/glimmer-component';

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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Settings: typeof SettingsComponent;
  }
}
