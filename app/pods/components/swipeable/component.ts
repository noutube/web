import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';
import Component from '@glint/environment-ember-loose/glimmer-component';
import { SafeString } from 'handlebars';

import { Input } from 'hammerjs';

import { IconName } from 'noutube/pods/components/svg-icon/component';

interface HammerEvent extends Event {
  gesture: typeof Input;
}

interface Signature {
  Args: {
    iconLeft: IconName;
    iconRight: IconName;
    swipeLeft: () => void;
    swipeRight: () => void;
  };
  Yields: {
    default: [];
  };
}

export default class SwipeableComponent extends Component<Signature> {
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Swipeable: typeof SwipeableComponent;
  }
}
