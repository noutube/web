import Component from '@glimmer/component';
import { action } from '@ember/object';
import { alias, oneWay } from '@ember/object/computed';
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

  @oneWay('settings.videoKey') videoKey;
  @oneWay('settings.videoDir') videoDir;
  @oneWay('settings.channelKey') channelKey;
  @oneWay('settings.channelDir') channelDir;
  @alias('settings.channelGroup') channelGroup;

  @action
  selectVideoKey(videoKey) {
    this.settings.videoKey = videoKey;
  }
  @action
  selectVideoDir(videoDir) {
    this.settings.videoDir = videoDir;
  }
  @action
  selectChannelKey(channelKey) {
    this.settings.channelKey = channelKey;
  }
  @action
  selectChannelDir(channelDir) {
    this.settings.channelDir = channelDir;
  }
}
