import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import config, {
  Theme,
  VideoKey,
  ChannelKey,
  Dir
} from 'noutube/config/environment';
import SessionService from 'noutube/services/session';

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

const defaultTheme = window.matchMedia?.('(prefers-color-scheme: dark)')
  ?.matches
  ? defaultDarkTheme
  : defaultLightTheme;

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
  @service declare session: SessionService;

  @tracked settings: Partial<Settings> = {};

  async restore(): Promise<void> {
    try {
      const response = await fetch(`${config.backendOrigin}/settings`, {
        headers: this.session.headers
      });
      if (response.ok) {
        this.settings = await response.json();
        console.debug('[settings] restored');
        this.applyTheme();
      } else {
        throw response.status;
      }
    } catch (error) {
      console.warn('[settings] restore failed', error);
    }
  }

  load(settings: Record<string, unknown>): void {
    this.settings = settings;
    console.log('[settings] loaded');
    this.applyTheme();
  }

  unload(): void {
    this.settings = {};
  }

  private async persist(): Promise<void> {
    try {
      const response = await fetch(`${config.backendOrigin}/settings`, {
        body: JSON.stringify(this.settings),
        headers: {
          ...this.session.headers,
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      });
      if (response.ok) {
        console.debug('[settings] persisted');
      } else {
        throw response.status;
      }
    } catch (error) {
      console.warn('[settings] persist failed', error);
    }
  }

  // size

  get size(): number {
    return this.settings.size ?? defaultSize;
  }
  set size(size: number) {
    this.settings = { ...this.settings, size };
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
    return this.settings.channelDir ?? defaultDir;
  }
  set channelDir(channelDir: Dir) {
    this.settings = { ...this.settings, channelDir };
    this.persist();
  }
  get channelGroup(): boolean {
    return this.settings.channelGroup ?? defaultChannelGroup;
  }
  set channelGroup(channelGroup: boolean) {
    this.settings = { ...this.settings, channelGroup };
    this.persist();
  }
  get channelKey(): ChannelKey {
    return this.settings.channelKey ?? defaultChannelKey;
  }
  set channelKey(channelKey: ChannelKey) {
    this.settings = { ...this.settings, channelKey };
    this.persist();
  }
  get videoDir(): Dir {
    return this.settings.videoDir ?? defaultDir;
  }
  set videoDir(videoDir: Dir) {
    this.settings = { ...this.settings, videoDir };
    this.persist();
  }
  get videoKey(): VideoKey {
    return this.settings.videoKey ?? defaultVideoKey;
  }
  set videoKey(videoKey: VideoKey) {
    this.settings = { ...this.settings, videoKey };
    this.persist();
  }

  // theme

  #themeClass = '';

  get theme(): Theme {
    return this.settings.theme ?? defaultTheme;
  }
  set theme(theme: Theme) {
    this.settings = { ...this.settings, theme };
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
    return this.settings.autoplay ?? defaultAutoplay;
  }
  set autoplay(autoplay: boolean) {
    this.settings = { ...this.settings, autoplay };
    this.persist();
  }

  // speed

  get speed(): number {
    return this.settings.speed ?? defaultSpeed;
  }
  set speed(speed: number) {
    this.settings = { ...this.settings, speed };
    this.persist();
    // clear per-channel speeds matching the new speed
    this.channelSpeeds = Object.fromEntries(
      Object.entries(this.channelSpeeds).filter(
        ([channelApiId, oldSpeed]) => oldSpeed !== speed
      )
    );
  }

  get channelSpeeds(): Record<string, number> {
    return this.settings.channelSpeeds ?? {};
  }
  set channelSpeeds(channelSpeeds: Record<string, number>) {
    this.settings = { ...this.settings, channelSpeeds };
    this.persist();
  }
}
