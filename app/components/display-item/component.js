import Component from '@glimmer/component';
import { action, computed, get, set } from '@ember/object';

import { storageFor } from 'ember-local-storage';

export default class DisplayItemComponent extends Component {
  @storageFor('settings') settings;

  embed = false;

  @computed('args.item.video.duration')
  get formattedDuration() {
    let duration = get(this.args.item.video, 'duration');
    let result = `${(`00${Math.floor(duration / 60) % 60}`).slice(-2)}:${(`00${duration % 60}`).slice(-2)}`;
    if (duration >= 60 * 60) {
      result = `${Math.floor(duration / 60 / 60)}:${result}`;
    }
    return result;
  }

  @action
  toggleEmbed() {
    set(this, 'embed', !this.embed);
  }
}
