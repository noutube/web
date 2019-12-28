import { action, computed, get, set } from '@ember/object';

import StorageObject from 'ember-local-storage/local/object';

import config from 'nou2ube/config/environment';
const {
  themes: [defaultTheme],
  sizes,
  videoKeys: [{ value: defaultVideoKey }],
  channelKeys: [{ value: defaultChannelKey }],
  dirs: [{ value: defaultDir }],
  defaultChannelGroup
} = config;
const [defaultSize] = sizes;

export default class SettingsStorage extends StorageObject {
  static initialState() {
    return {
      theme: defaultTheme,
      size: defaultSize,
      videoKey: defaultVideoKey,
      videoDir: defaultDir,
      channelKey: defaultChannelKey,
      channelDir: defaultDir,
      channelGroup: defaultChannelGroup
    };
  }

  @computed('videoKey', 'videoDir')
  get videoSort() {
    return [`${get(this, 'videoKey')}:${get(this, 'videoDir')}`];
  }

  @computed('size')
  get sizeWidth() {
    return get(this, 'size') * 16 / 9;
  }

  @action
  switchSize() {
    let currentSizeIndex = sizes.indexOf(get(this, 'size'));
    let newSizeIndex = (currentSizeIndex + 1) % sizes.length;
    set(this, 'size', sizes[newSizeIndex]);
  }
}
