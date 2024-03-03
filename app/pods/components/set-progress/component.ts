import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import VideoModel from 'noutube/models/video';

interface Signature {
  Args: {
    video: VideoModel;
  };
}

const TIME_PATTERN = /^(\d+:)?\d+:\d+$/;

const parseTime = (time: string): number => {
  return time
    .split(':')
    .map((part) => parseInt(part, 10))
    .reduce((acc, n) => acc * 60 + n, 0);
};

export default class SetProgressComponent extends Component<Signature> {
  @tracked progress = '';
  @tracked state: 'idle' | 'inFlight' | 'success' | 'failure' = 'idle';

  get valid(): boolean {
    return (
      !!this.progress.match(TIME_PATTERN) &&
      parseTime(this.progress) <= this.args.video.duration
    );
  }

  @action
  handleProgress(progress: string): void {
    this.progress = progress;
    this.state = 'idle';
  }

  @action
  async setProgress(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.valid) {
      return;
    }

    try {
      this.state = 'inFlight';
      this.args.video.progress = parseTime(this.progress);
      await this.args.video.save();
      this.state = 'success';
      this.progress = '';
    } catch (error) {
      this.state = 'failure';
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SetProgress: typeof SetProgressComponent;
  }
}
