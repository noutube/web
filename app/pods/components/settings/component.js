import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

import config from 'nou2ube/config/environment';

const {
  themes,
  sizes,
  videoKeys,
  channelKeys,
  dirs,
  speeds
} = config;

export default class SettingsComponent extends Component {
  @service settings;

  themes = themes;
  sizes = sizes;
  videoKeys = videoKeys;
  channelKeys = channelKeys;
  dirs = dirs;
  speeds = speeds;
}
