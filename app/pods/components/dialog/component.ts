import { action } from '@ember/object';
import Component from '@glimmer/component';

interface Args {
  accept?: () => void;
  acceptLabel?: string;
  cancelLabel?: string;
  cancel?: () => void;
  close?: () => void;
  title?: string;
}

export default class DialogComponent extends Component<Args> {
  @action
  onClickOverlay(event: Event): void {
    if (event.target === event.currentTarget && this.args.close) {
      this.args.close();
    }
  }
}
