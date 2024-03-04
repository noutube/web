import Component from '@glimmer/component';

import VideoModel from 'noutube/models/video';

interface Signature {
  Args: {
    videos: VideoModel[];
  };
}

export default class VideosTotalsComponent extends Component<Signature> {
  get totalDuration(): number {
    return this.args.videos.reduce((sum, video) => sum + video.remaining, 0);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    VideosTotals: typeof VideosTotalsComponent;
  }
}
