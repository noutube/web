import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

import config from 'nou2ube/config/environment';

const {
  sizes,
  videoKeys,
  channelKeys,
  dirs
} = config;

export default class SettingsComponent extends Component {
  @service settings;

  sizes = sizes;
  videoKeys = videoKeys;
  channelKeys = channelKeys;
  dirs = dirs;
}
