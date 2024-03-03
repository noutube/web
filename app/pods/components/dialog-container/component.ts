import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import DialogService from 'noutube/services/dialog';

export default class DialogContainerComponent extends Component {
  @service declare dialog: DialogService;

  @action
  clearDialogContainer(): void {
    this.dialog.dialogContainerElement = null;
  }

  @action
  setDialogContainer(element: Element | null): void {
    this.dialog.dialogContainerElement = element;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    DialogContainer: typeof DialogContainerComponent;
  }
}
