import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

import config from 'nou2ube/config/environment';

const {
  videoKeys,
  channelKeys,
  dirs
} = config;

export default class SortingSettingsComponent extends Component {
  @service settings;

  videoKeys = videoKeys;
  channelKeys = channelKeys;
  dirs = dirs;
}
