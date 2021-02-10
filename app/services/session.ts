import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import Service, { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import { tracked } from '@glimmer/tracking';

import config from 'nou2ube/config/environment';
import JSONAPIPayload from 'nou2ube/lib/types/json-api-payload';
import User from 'nou2ube/models/user';

const storageKey = 'storage:session';

export default class SessionService extends Service {
  @service declare store: Store;
  @service declare router: RouterService;

  @tracked me: User | null = null;
  @tracked down = false;
  #popup: Window | null = null;
  #popupInterval?: number;
  @tracked popupOpen = false;

  constructor() {
    super(...arguments);

    window.addEventListener('message', this.authMessage);
  }

  restoreMe(): User | null {
    const json = window.localStorage.getItem(storageKey);
    if (!json) {
      return null;
    }
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  async restore(): Promise<void> {
    const me = this.restoreMe();
    if (me) {
      try {
        const response = await fetch(`${config.backendOrigin}/auth/restore`, {
          headers: {
            'X-User-Email': me.email,
            'X-User-Token': me.authenticationToken
          }
        });
        if (response.status > 500) {
          throw response.status;
        } else if (response.ok) {
          const payload = await response.json();
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
  signIn(): void {
    this.closePopup();
    this.#popup = window.open(`${config.backendOrigin}/auth`);
    this.#popupInterval = window.setInterval(this.pollPopup, 1000);
    this.popupOpen = true;
  }

  @action
  async authMessage(event: MessageEvent): Promise<void> {
    if (event.origin !== config.backendOrigin) {
      return;
    }

    if (event.data.name === 'login') {
      this.closePopup();
      try {
        const response = await fetch(
          `${config.backendOrigin}/auth/sign_in?code=${event.data.data.code}`
        );
        const payload = await response.json();
        this.pushMe(payload);
        console.debug('[session] signed in');
        this.router.transitionTo('feed');
      } catch (e) {
        console.warn('[session] sign in failed', e);
      }
    }
  }

  pushMe(payload: JSONAPIPayload): void {
    this.store.pushPayload(payload);
    this.me = this.store.peekRecord('user', payload.data.id);
    this.persist();
  }

  @action
  signOut(): void {
    console.debug('[session] signed out');
    this.clear();
  }

  @action
  async destroyMe(): Promise<void> {
    if (!this.me) {
      return;
    }
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

  clear(): void {
    if (this.me) {
      this.me.unloadRecord();
      this.me = null;
    }
    this.persist();
    this.router.transitionTo('landing');
  }

  persist(): void {
    if (this.me) {
      const json = JSON.stringify({
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
  pollPopup(): void {
    if (this.#popup && this.#popup.closed) {
      this.closePopup();
    }
  }

  closePopup(): void {
    if (this.#popup) {
      this.#popup.close();
      this.#popup = null;
      window.clearInterval(this.#popupInterval);
      this.#popupInterval = undefined;
      this.popupOpen = false;
    }
  }
}
