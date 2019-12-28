import Component from '@glimmer/component';
import { action, computed, set } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class SwipeableComponent extends Component {
  // configurable properties
  swipeLimit = 50;

  // use to position element
  @computed('offsetX', 'directionX')
  get swipePosition() {
    return this.offsetX * this.directionX;
  }
  @computed('swipePosition')
  get style() {
    return htmlSafe(`transform: translateX(${this.swipePosition}px);`);
  }

  // internals

  isSwiping = false;
  deltaX = 0;
  @computed('swipeLimit', 'deltaX')
  get offsetX() {
    return Math.min(this.swipeLimit, Math.abs(this.deltaX));
  }
  @computed('deltaX')
  get directionX() {
    return Math.sign(this.deltaX);
  }

  @action
  panStart(event) {
    event.stopPropagation();
    set(this, 'isSwiping', true);
    set(this, 'deltaX', 0);
  }
  @action
  panMove(event) {
    if (this.isSwiping) {
      event.stopPropagation();
      set(this, 'deltaX', event.gesture.deltaX);
      if (Math.abs(event.gesture.deltaY) > this.swipeLimit / 2) {
        this.panCancel(event);
      }
    }
  }
  @action
  panEnd(event) {
    event.stopPropagation();
    set(this, 'isSwiping', false);
    if (this.offsetX === this.swipeLimit) {
      if (this.directionX > 0) {
        this.args.swipeRight();
      } else {
        this.args.swipeLeft();
      }
    }
    set(this, 'deltaX', 0);
  }
  @action
  panCancel(event) {
    event.stopPropagation();
    set(this, 'isSwiping', false);
    set(this, 'deltaX', 0);
  }
}
