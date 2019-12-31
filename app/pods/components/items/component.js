import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class ItemsComponent extends Component {
  @service settings;

  @computed('settings.{videoKey,videoDir}')
  get videoSort() {
    let { videoKey, videoDir } = this.settings;
    return [`${videoKey}:${videoDir}`];
  }

  @sort('args.items', 'videoSort') itemsSorted;
}
