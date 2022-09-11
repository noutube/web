import StorageObject from 'ember-local-storage/local/object';

import config, {
  Theme,
  VideoKey,
  ChannelKey,
  Dir
} from 'noutube/config/environment';

const {
  themes: [{ value: defaultTheme }, { value: defaultDarkTheme }],
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
  channelSpeeds: Record<string, number>;
}

export default class SettingsStorage extends StorageObject<Settings> {
  static initialState(): Settings {
    const theme = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? defaultDarkTheme : defaultTheme;
    return {
      theme,
      size: defaultSize,
      videoKey: defaultVideoKey,
      videoDir: defaultDir,
      channelKey: defaultChannelKey,
      channelDir: defaultDir,
      channelGroup: defaultChannelGroup,
      autoplay: defaultAutoplay,
      speed: defaultSpeed,
      channelSpeeds: {}
    };
  }
}

declare module 'ember-local-storage' {
  interface Registry {
    settings: SettingsStorage;
  }
}
