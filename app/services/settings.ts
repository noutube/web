import Service from '@ember/service';

import { storageFor } from 'ember-local-storage';

import { Theme, VideoKey, ChannelKey, Dir } from 'noutube/config/environment';
import SettingsStorage from 'noutube/storages/settings';

export default class SettingsService extends Service {
  @storageFor('settings') declare storage: SettingsStorage;

  // size

  get size(): number {
    return this.storage.get('size');
  }
  set size(size: number) {
    this.storage.set('size', size);
  }

  get sizeHeight(): number {
    return this.size;
  }

  get sizeWidth(): number {
    return this.size * (16 / 9);
  }

  // sorting

  get channelDir(): Dir {
    return this.storage.get('channelDir');
  }
  set channelDir(channelDir: Dir) {
    this.storage.set('channelDir', channelDir);
  }
  get channelGroup(): boolean {
    return this.storage.get('channelGroup');
  }
  set channelGroup(channelGroup: boolean) {
    this.storage.set('channelGroup', channelGroup);
  }
  get channelKey(): ChannelKey {
    return this.storage.get('channelKey');
  }
  set channelKey(channelKey: ChannelKey) {
    this.storage.set('channelKey', channelKey);
  }
  get videoDir(): Dir {
    return this.storage.get('videoDir');
  }
  set videoDir(videoDir: Dir) {
    this.storage.set('videoDir', videoDir);
  }
  get videoKey(): VideoKey {
    return this.storage.get('videoKey');
  }
  set videoKey(videoKey: VideoKey) {
    this.storage.set('videoKey', videoKey);
  }

  // theme

  #themeClass = '';

  get theme(): Theme {
    return this.storage.get('theme');
  }
  set theme(theme: Theme) {
    this.storage.set('theme', theme);
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
    return this.storage.get('autoplay');
  }
  set autoplay(autoplay: boolean) {
    this.storage.set('autoplay', autoplay);
  }

  // speed

  get speed(): number {
    return this.storage.get('speed');
  }
  set speed(speed: number) {
    this.storage.set('speed', speed);
    // clear per-channel speeds matching the new speed
    this.channelSpeeds = Object.fromEntries(
      Object.entries(this.channelSpeeds).filter(
        ([channelApiId, oldSpeed]) => oldSpeed !== speed
      )
    );
  }

  get channelSpeeds(): Record<string, number> {
    return this.storage.get('channelSpeeds');
  }
  set channelSpeeds(channelSpeeds: Record<string, number>) {
    this.storage.set('channelSpeeds', channelSpeeds);
  }
}
