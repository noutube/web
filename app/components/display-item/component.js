import Component from '@ember/component';
import { action, computed, get } from '@ember/object';

import { classNames } from '@ember-decorators/component';

import { storageFor } from 'ember-local-storage';

export default
@classNames('item')
class DisplayItemComponent extends Component {
  @storageFor('settings') settings;

  item = null;
  embed = false;

  @computed('item.video.duration')
  get formattedDuration() {
    let duration = get(this.item.video, 'duration');
    let result = `${(`00${Math.floor(duration / 60) % 60}`).slice(-2)}:${(`00${duration % 60}`).slice(-2)}`;
    if (duration >= 60 * 60) {
      result = `${Math.floor(duration / 60 / 60)}:${result}`;
    }
    return result;
  }

  @action
  toggleEmbed() {
    this.toggleProperty('embed');
  }
}
