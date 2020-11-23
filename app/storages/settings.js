import StorageObject from 'ember-local-storage/local/object';

import config from 'nou2ube/config/environment';
const {
  themes: [{ value: defaultTheme }],
  sizes: [defaultSize],
  videoKeys: [{ value: defaultVideoKey }],
  channelKeys: [{ value: defaultChannelKey }],
  dirs: [{ value: defaultDir }],
  defaultChannelGroup,
  defaultAutoplay
} = config;

export default class SettingsStorage extends StorageObject {
  static initialState() {
    return {
      theme: defaultTheme,
      size: defaultSize,
      videoKey: defaultVideoKey,
      videoDir: defaultDir,
      channelKey: defaultChannelKey,
      channelDir: defaultDir,
      channelGroup: defaultChannelGroup,
      autoplay: defaultAutoplay
    };
  }
}
