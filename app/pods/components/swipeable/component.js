import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class SwipeableComponent extends Component {
  // configurable properties
  swipeLimit = 50;

  // use to position element
  get swipePosition() {
    return this.offsetX * this.directionX;
  }
  get style() {
    return htmlSafe(`transform: translateX(${this.swipePosition}px);`);
  }

  // internals

  @tracked isSwiping = false;
  @tracked deltaX = 0;
  get offsetX() {
    return Math.min(this.swipeLimit, Math.abs(this.deltaX));
  }
  get directionX() {
    return Math.sign(this.deltaX);
  }

  @action
  panStart(event) {
    event.stopPropagation();
    this.isSwiping = true;
    this.deltaX = 0;
  }
  @action
  panMove(event) {
    if (this.isSwiping) {
      event.stopPropagation();
      this.deltaX = event.gesture.deltaX;
      if (Math.abs(event.gesture.deltaY) > this.swipeLimit / 2) {
        this.panCancel(event);
      }
    }
  }
  @action
  panEnd(event) {
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
  panCancel(event) {
    event.stopPropagation();
    this.isSwiping = false;
    this.deltaX = 0;
  }
}
