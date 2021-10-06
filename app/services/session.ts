import Store from '@ember-data/store';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import config from 'nou2ube/config/environment';
import JSONAPIPayload from 'nou2ube/lib/types/json-api-payload';
import User from 'nou2ube/models/user';

const storageKey = 'storage:session';

export default class SessionService extends Service {
  @service declare router: RouterService;
  @service declare store: Store;

  @tracked me: User | null = null;
  @tracked down = false;

  @action
  async destroyMe(): Promise<void> {
    if (!this.me) {
      return;
    }

    try {
      this.me.deleteRecord();
      await this.me.save();
      console.debug('[session] user destroyed');
      this.#clear();
    } catch (error) {
      console.warn('[session] user destroy failed', error);
      this.me.rollbackAttributes();
    }
  }

  async restore(): Promise<void> {
    const me = this.#restore();
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
          this.#push(payload);
          console.debug('[session] restored');
        } else {
          console.warn('[session] restore failed: rejected', response.status);
          this.#clear();
        }
      } catch (error) {
        console.warn('[session] restore failed: down', error);
        this.down = true;
      }
    }
  }

  async register(email: string, password: string): Promise<void> {
    // for some reason passing as the initial hash doesn't work
    const me = this.store.createRecord('user');
    me.email = email;
    me.password = password;
    try {
      await me.save();
      this.me = me;
      this.#persist();
      console.debug('[session] registered');
      this.router.transitionTo('feed');
    } catch (error) {
      console.warn('[session] register failed', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const response = await fetch(`${config.backendOrigin}/auth`, {
        body: JSON.stringify({ email, password }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status > 500) {
        throw response.status;
      } else if (response.ok) {
        const payload = await response.json();
        this.#push(payload);
        console.debug('[session] signed in');
        this.router.transitionTo('feed');
      } else {
        throw response.status;
      }
    } catch (error) {
      console.warn('[session] sign in failed', error);
      throw error;
    }
  }

  @action
  signOut(): void {
    console.debug('[session] signed out');
    this.#clear();
  }

  #clear(): void {
    if (this.me) {
      this.me.unloadRecord();
      this.me = null;
    }
    this.#persist();
    this.router.transitionTo('landing');
  }

  #persist(): void {
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

  #push(payload: JSONAPIPayload): void {
    this.store.pushPayload(payload);
    this.me = this.store.peekRecord('user', payload.data.id);
    this.#persist();
  }

  #restore(): User | null {
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
}
