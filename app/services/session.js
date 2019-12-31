import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Service, { inject as service } from '@ember/service';

import config from 'nou2ube/config/environment';

const storageKey = 'storage:session';

export default class SessionService extends Service {
  @service store;
  @service router;

  @tracked me = null;
  @tracked down = false;
  #popup = null;
  #popupInterval = null;
  @tracked popupOpen = false;

  init() {
    window.addEventListener('message', this.authMessage);

    super.init(...arguments);
  }

  restoreMe() {
    let json = window.localStorage.getItem(storageKey);
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  async restore() {
    let me = this.restoreMe();
    if (me) {
      try {
        let response = await fetch(`${config.backendOrigin}/auth/restore`, {
          headers: {
            'X-User-Email': me.email,
            'X-User-Token': me.authenticationToken
          }
        });
        if (response.status > 500) {
          throw response.status;
        } else if (response.ok) {
          let payload = await response.json();
          this.pushMe(payload);
          console.debug('[session] restored');
        } else {
          console.warn('[session] restore failed: rejected', response.status);
          this.clear();
        }
      } catch (e) {
        console.warn('[session] restore failed: down', e);
        this.down = true;
      }
    }
  }

  @action
  signIn() {
    this.closePopup();
    this.#popup = window.open(`${config.backendOrigin}/auth`);
    this.#popupInterval = setInterval(this.pollPopup, 1000);
    this.popupOpen = true;
  }

  @action
  async authMessage(event) {
    if (event.origin !== config.backendOrigin) {
      return;
    }

    if (event.data.name === 'login') {
      this.closePopup();
      try {
        let response = await fetch(`${config.backendOrigin}/auth/sign_in?code=${event.data.data.code}`);
        let payload = await response.json();
        this.pushMe(payload);
        console.debug('[session] signed in');
        this.router.transitionTo('feed');
      } catch (e) {
        console.warn('[session] sign in failed', e);
      }
    }
  }

  pushMe(payload) {
    this.store.pushPayload(payload);
    this.me = this.store.peekRecord('user', payload.data.id);
    this.persist();
  }

  @action
  signOut() {
    console.debug('[session] signed out');
    this.clear();
  }

  @action
  async destroyMe() {
    try {
      this.me.deleteRecord();
      await this.me.save();
      console.debug('[session] user destroyed');
      this.clear();
    } catch (e) {
      console.warn('[session] user destroy failed', e);
      this.me.rollbackAttributes();
    }
  }

  clear() {
    if (this.me) {
      this.me.unloadRecord();
      this.me = null;
    }
    this.persist();
    this.router.transitionTo('landing');
  }

  persist() {
    if (this.me) {
      let json = JSON.stringify({
        id: this.me.id,
        email: this.me.email,
        authenticationToken: this.me.authenticationToken
      });
      window.localStorage.setItem(storageKey, json);
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }

  @action
  pollPopup() {
    if (this.#popup && this.#popup.closed) {
      this.closePopup();
    }
  }

  closePopup() {
    if (this.#popup) {
      this.#popup.close();
      this.#popup = null;
      clearInterval(this.#popupInterval);
      this.#popupInterval = null;
      this.popupOpen = false;
    }
  }
}
