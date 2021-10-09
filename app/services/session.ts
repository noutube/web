import Store from '@ember-data/store';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import jwtDecode from 'jwt-decode';

import config from 'nou2ube/config/environment';

const storageKey = 'storage:token';

interface JWTPayload {
  id: string;
}

export default class SessionService extends Service {
  @service declare router: RouterService;
  @service declare store: Store;

  @tracked token: string | null = null;
  @tracked down = false;

  get signedIn(): boolean {
    return !!this.token;
  }

  get id(): string | null {
    if (this.token) {
      const { id } = jwtDecode(this.token) as JWTPayload;
      return id;
    } else {
      return null;
    }
  }

  async restore(): Promise<void> {
    const token = this.#restore();
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${config.backendOrigin}/tokens/valid`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status > 500) {
        throw response.status;
      } else if (response.ok) {
        this.#push(token);
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

  async signIn(email: string, password: string): Promise<void> {
    try {
      const response = await fetch(`${config.backendOrigin}/tokens`, {
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      if (response.status > 500) {
        throw response.status;
      } else if (response.ok) {
        const { token } = await response.json();
        this.#push(token);
        console.debug('[session] signed in');
      } else {
        throw response.status;
        this.#clear();
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
    this.token = null;
    this.#persist();
    this.router.transitionTo('landing');
  }

  #persist(): void {
    if (this.token) {
      window.localStorage.setItem(storageKey, this.token);
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }

  #push(token: string): void {
    this.token = token;
    this.#persist();
    this.router.transitionTo('feed');
  }

  #restore(): string | null {
    return window.localStorage.getItem(storageKey);
  }
}
