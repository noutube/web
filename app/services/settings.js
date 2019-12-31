import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import { storageFor } from 'ember-local-storage';

import config from 'nou2ube/config/environment';
const { sizes, themes } = config;

export default class SettingsService extends Service {
  @storageFor('settings') storage;

  // size

  @alias('storage.size') size;

  @computed('size')
  get sizeHeight() {
    return this.size;
  }

  @computed('size')
  get sizeWidth() {
    return this.size * 16 / 9;
  }

  @action
  switchSize() {
    let currentSizeIndex = sizes.indexOf(this.size);
    let newSizeIndex = (currentSizeIndex + 1) % sizes.length;
    this.size = sizes[newSizeIndex];
  }

  // sorting

  @alias('storage.channelDir') channelDir;
  @alias('storage.channelGroup') channelGroup;
  @alias('storage.channelKey') channelKey;
  @alias('storage.videoDir') videoDir;
  @alias('storage.videoKey') videoKey;

  // theme

  #themeClass = '';

  @alias('storage.theme') theme;

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
