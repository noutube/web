import { action } from '@ember/object';
import { service } from '@ember/service';
import Store from '@ember-data/store';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface Signature {
  Args: {
    success: () => void;
  };
}

export default class AddVideoComponent extends Component<Signature> {
  @service declare store: Store;

  @tracked apiId = '';
  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';

  get valid(): boolean {
    return !!this.apiId;
  }

  @action
  handleApiId(apiId: string): void {
    this.apiId = apiId;
    this.state = 'idle';
  }

  @action
  async addVideo(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.valid) {
      return;
    }

    const video = this.store.createRecord('video');
    try {
      this.state = 'inFlight';
      video.apiId = this.apiId;
      await video.save();
      this.state = 'success';
      this.apiId = '';
      this.args.success?.();
    } catch (error) {
      video.unloadRecord();
      this.state = 'failure';
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    AddVideo: typeof AddVideoComponent;
  }
}
