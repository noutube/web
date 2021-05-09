import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MenuBarService extends Service {
  @tracked extrasElement: Element | null = null;
}
