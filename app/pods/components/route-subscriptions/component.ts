import ArrayProxy from '@ember/array';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { compare } from '@ember/utils';
import Store from '@ember-data/store';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import ChannelModel from 'noutube/models/channel';

interface Signature {
  Args: {
    channels: ArrayProxy<ChannelModel>;
  };
}

export default class RouteSubscriptionsComponent extends Component<Signature> {
  @service declare store: Store;

  @tracked apiId = '';
  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';

  get subscribedChannels(): ChannelModel[] {
    return this.args.channels
      .filter((channel) => !channel.isNew && channel.isSubscribed)
      .sort((a, b) => compare(a.sortableTitle, b.sortableTitle));
  }

  get unsubscribedChannels(): ChannelModel[] {
    return this.args.channels
      .filter((channel) => !channel.isNew && !channel.isSubscribed)
      .sort((a, b) => compare(a.sortableTitle, b.sortableTitle));
  }

  get valid(): boolean {
    return !!this.apiId;
  }

  @action
  handleApiId(apiId: string): void {
    this.apiId = apiId;
    this.state = 'idle';
  }

  @action
  async addChannel(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.valid) {
      return;
    }

    const channel = this.store.createRecord('channel');
    try {
      this.state = 'inFlight';
      channel.apiId = this.apiId;
      channel.isSubscribed = true;
      await channel.save();
      this.state = 'success';
      this.apiId = '';
    } catch (error) {
      channel.unloadRecord();
      this.state = 'failure';
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteSubscriptions: typeof RouteSubscriptionsComponent;
  }
}
