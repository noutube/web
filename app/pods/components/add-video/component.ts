import Store from '@ember-data/store';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';

export default class AddVideoComponent extends Component {
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
