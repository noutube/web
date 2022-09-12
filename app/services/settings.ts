import Service from '@ember/service';

import config, { Theme, VideoKey, ChannelKey, Dir } from 'noutube/config/environment';

const storageKey = 'storage:settings';

const {
  themes: [{ value: defaultLightTheme }, { value: defaultDarkTheme }],
  sizes: [defaultSize],
  videoKeys: [{ value: defaultVideoKey }],
  channelKeys: [{ value: defaultChannelKey }],
  dirs: [{ value: defaultDir }],
  defaultChannelGroup,
  defaultAutoplay,
  defaultSpeed
} = config;

const defaultTheme = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? defaultDarkTheme : defaultLightTheme;

interface Settings {
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

export default class SettingsService extends Service {
  #settings: Partial<Settings> = {};

  restore(): void {
    const settings = window.localStorage.getItem(storageKey);
    if (settings) {
      try {
        this.#settings = JSON.parse(settings);
      } catch (error) {
        console.warn('[settings] restore failed', error);
      }
      console.debug('[settings] restored');
    }
  }

  private persist(): void {
    window.localStorage.setItem(storageKey, JSON.stringify(this.#settings));
    console.debug('[settings] persisted');
  }

  // size

  get size(): number {
    return this.#settings.size ?? defaultSize;
  }
  set size(size: number) {
    this.#settings.size = size;
    this.persist();
  }

  get sizeHeight(): number {
    return this.size;
  }

  get sizeWidth(): number {
    return this.size * (16 / 9);
  }

  // sorting

  get channelDir(): Dir {
    return this.#settings.channelDir ?? defaultDir;
  }
  set channelDir(channelDir: Dir) {
    this.#settings.channelDir = channelDir;
    this.persist();
  }
  get channelGroup(): boolean {
    return this.#settings.channelGroup ?? defaultChannelGroup;
  }
  set channelGroup(channelGroup: boolean) {
    this.#settings.channelGroup = channelGroup;
    this.persist();
  }
  get channelKey(): ChannelKey {
    return this.#settings.channelKey ?? defaultChannelKey;
  }
  set channelKey(channelKey: ChannelKey) {
    this.#settings.channelKey = channelKey;
    this.persist();
  }
  get videoDir(): Dir {
    return this.#settings.videoDir ?? defaultDir;
  }
  set videoDir(videoDir: Dir) {
    this.#settings.videoDir = videoDir;
    this.persist();
  }
  get videoKey(): VideoKey {
    return this.#settings.videoKey ?? defaultVideoKey;
  }
  set videoKey(videoKey: VideoKey) {
    this.#settings.videoKey = videoKey;
    this.persist();
  }

  // theme

  #themeClass = '';

  get theme(): Theme {
    return this.#settings.theme ?? defaultTheme;
  }
  set theme(theme: Theme) {
    this.#settings.theme = theme;
    this.persist();
    this.applyTheme();
  }

  applyTheme(): void {
    const newThemeClass = `theme--${this.theme}`;
    if (newThemeClass !== this.#themeClass) {
      if (this.#themeClass) {
        document.querySelector('body')?.classList.remove(this.#themeClass);
      }
      if (newThemeClass) {
        document.querySelector('body')?.classList.add(newThemeClass);
      }
      this.#themeClass = newThemeClass;
    }
  }

  // autoplay

  get autoplay(): boolean {
    return this.#settings.autoplay ?? defaultAutoplay;
  }
  set autoplay(autoplay: boolean) {
    this.#settings.autoplay = autoplay;
    this.persist();
  }

  // speed

  get speed(): number {
    return this.#settings.speed ?? defaultSpeed;
  }
  set speed(speed: number) {
    this.#settings.speed = speed;
    this.persist();
    // clear per-channel speeds matching the new speed
    this.channelSpeeds = Object.fromEntries(
      Object.entries(this.channelSpeeds).filter(
        ([channelApiId, oldSpeed]) => oldSpeed !== speed
      )
    );
  }

  get channelSpeeds(): Record<string, number> {
    return this.#settings.channelSpeeds ?? {};
  }
  set channelSpeeds(channelSpeeds: Record<string, number>) {
    this.#settings.channelSpeeds = channelSpeeds;
    this.persist();
  }
}
