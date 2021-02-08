import StorageObject from 'ember-local-storage/local/object';

import config, {
  Theme,
  VideoKey,
  ChannelKey,
  Dir
} from 'nou2ube/config/environment';

const {
  themes: [{ value: defaultTheme }],
  sizes: [defaultSize],
  videoKeys: [{ value: defaultVideoKey }],
  channelKeys: [{ value: defaultChannelKey }],
  dirs: [{ value: defaultDir }],
  defaultChannelGroup,
  defaultAutoplay,
  defaultSpeed
} = config;

export interface Settings {
  theme: Theme;
  size: number;
  videoKey: VideoKey;
  videoDir: Dir;
  channelKey: ChannelKey;
  channelDir: Dir;
  channelGroup: boolean;
  autoplay: boolean;
  speed: number;
}

export default class SettingsStorage extends StorageObject<Settings> {
  static initialState(): Settings {
    return {
      theme: defaultTheme,
      size: defaultSize,
      videoKey: defaultVideoKey,
      videoDir: defaultDir,
      channelKey: defaultChannelKey,
      channelDir: defaultDir,
      channelGroup: defaultChannelGroup,
      autoplay: defaultAutoplay,
      speed: defaultSpeed
    };
  }
}

declare module 'ember-local-storage' {
  interface Registry {
    settings: SettingsStorage;
  }
}
