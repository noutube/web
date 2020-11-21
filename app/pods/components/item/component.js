import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ItemComponent extends Component {
  @service settings;

  @tracked embed = false;

  get showEmbed() {
    return this.embed || this.args.autoplay;
  }

  get formattedDuration() {
    let { duration } = this.args.item.video;
    let result = `${(`00${Math.floor(duration / 60) % 60}`).slice(-2)}:${(`00${duration % 60}`).slice(-2)}`;
    if (duration >= 60 * 60) {
      result = `${Math.floor(duration / 60 / 60)}:${result}`;
    }
    return result;
  }

  @action
  toggleEmbed() {
    this.embed = !this.showEmbed;
    this.args.onEmbedToggled();
  }

  @action
  markLater() {
    this.args.item.markLater();
  }

  @action
  markDeleted() {
    this.args.item.markDeleted();
  }

  @action
  embedEnded() {
    this.embed = false;
    this.args.onEmbedEnded();
  }
}
