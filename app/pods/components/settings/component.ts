import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import config from 'nou2ube/config/environment';
import SettingsService from 'nou2ube/services/settings';

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
