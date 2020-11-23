import { action } from '@ember/object';
import Service from '@ember/service';

import { storageFor } from 'ember-local-storage';

import config from 'nou2ube/config/environment';
const { themes } = config;

export default class SettingsService extends Service {
  @storageFor('settings') storage;

  // size

  get size() {
    return this.storage.get('size');
  }
  set size(size) {
    this.storage.set('size', size);
  }

  get sizeHeight() {
    return this.size;
  }

  get sizeWidth() {
    return this.size * 16 / 9;
  }

  // sorting

  get channelDir() {
    return this.storage.get('channelDir');
  }
  set channelDir(channelDir) {
    this.storage.set('channelDir', channelDir);
  }
  get channelGroup() {
    return this.storage.get('channelGroup');
  }
  set channelGroup(channelGroup) {
    this.storage.set('channelGroup', channelGroup);
  }
  get channelKey() {
    return this.storage.get('channelKey');
  }
  set channelKey(channelKey) {
    this.storage.set('channelKey', channelKey);
  }
  get videoDir() {
    return this.storage.get('videoDir');
  }
  set videoDir(videoDir) {
    this.storage.set('videoDir', videoDir);
  }
  get videoKey() {
    return this.storage.get('videoKey');
  }
  set videoKey(videoKey) {
    this.storage.set('videoKey', videoKey);
  }

  // theme

  #themeClass = '';

  get theme() {
    return this.storage.get('theme');
  }
  set theme(theme) {
    this.storage.set('theme', theme);
  }

  applyTheme() {
    let newThemeClass = `theme--${this.theme}`;
    if (newThemeClass !== this.#themeClass) {
      if (this.#themeClass) {
        document.querySelector('body').classList.remove(this.#themeClass);
      }
      if (newThemeClass) {
        document.querySelector('body').classList.add(newThemeClass);
      }
      this.#themeClass = newThemeClass;
    }
  }

  @action
  switchTheme() {
    let currentThemeIndex = themes.indexOf(this.theme);
    let newThemeIndex = (currentThemeIndex + 1) % themes.length;
    this.theme = themes[newThemeIndex];
    this.applyTheme();
  }
}
