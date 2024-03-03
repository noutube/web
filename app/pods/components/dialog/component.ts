import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import DialogService from 'noutube/services/dialog';

interface Signature {
  Args: {
    accept?: () => void;
    acceptLabel?: string;
    cancelLabel?: string;
    close?: () => void;
    title?: string;
  };
  Blocks: {
    default: [];
  };
}

export default class DialogComponent extends Component<Signature> {
  @service declare dialog: DialogService;

  @action
  onClickOverlay(event: Event): void {
    if (event.target === event.currentTarget && this.args.close) {
      this.args.close();
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Dialog: typeof DialogComponent;
  }
}
