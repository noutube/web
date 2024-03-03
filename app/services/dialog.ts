import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DialogService extends Service {
  @tracked dialogContainerElement: Element | null = null;
}
