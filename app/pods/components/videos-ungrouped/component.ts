import Component from '@glint/environment-ember-loose/glimmer-component';

import VideoModel from 'noutube/models/video';

interface Signature {
  Args: {
    videos: VideoModel[];
  };
}

export default class VideosUngroupedComponent extends Component<Signature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    VideosUngrouped: typeof VideosUngroupedComponent;
  }
}
