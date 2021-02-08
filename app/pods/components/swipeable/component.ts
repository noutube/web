import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SafeString } from 'handlebars';

import { Input } from 'hammerjs';

interface HammerEvent extends Event {
  gesture: typeof Input;
}

interface Args {
  iconLeft: string;
  iconRight: string;
  swipeLeft: () => void;
  swipeRight: () => void;
}

export default class SwipeableComponent extends Component<Args> {
  // configurable properties
  swipeLimit = 50;

  // use to position element
  get swipePosition(): number {
    return this.offsetX * this.directionX;
  }
  get style(): SafeString {
    return htmlSafe(`transform: translateX(${this.swipePosition}px);`);
  }

  // internals

  @tracked isSwiping = false;
  @tracked deltaX = 0;
  get offsetX(): number {
    return Math.min(this.swipeLimit, Math.abs(this.deltaX));
  }
  get directionX(): number {
    return Math.sign(this.deltaX);
  }

  @action
  panStart(event: HammerEvent): void {
    event.stopPropagation();
    this.isSwiping = true;
    this.deltaX = 0;
  }
  @action
  panMove(event: HammerEvent): void {
    if (this.isSwiping) {
      event.stopPropagation();
      this.deltaX = event.gesture.deltaX;
      if (Math.abs(event.gesture.deltaY) > this.swipeLimit / 2) {
        this.panCancel(event);
      }
    }
  }
  @action
  panEnd(event: HammerEvent): void {
    event.stopPropagation();
    this.isSwiping = false;
    if (this.offsetX === this.swipeLimit) {
      if (this.directionX > 0) {
        this.args.swipeRight();
      } else {
        this.args.swipeLeft();
      }
    }
    this.deltaX = 0;
  }
  @action
  panCancel(event: HammerEvent): void {
    event.stopPropagation();
    this.isSwiping = false;
    this.deltaX = 0;
  }
}
