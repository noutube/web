import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SafeString } from 'handlebars';

import { PanEvent } from 'global';

import { IconName } from 'noutube/pods/components/svg-icon/component';

interface Signature {
  Args: {
    iconLeft: IconName;
    iconRight: IconName;
    swipeLeft: () => void;
    swipeRight: () => void;
  };
  Blocks: {
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

  wrappingElement: HTMLElement | null = null;
  @tracked isSwiping = false;
  @tracked distanceX = 0;
  get offsetX(): number {
    return Math.min(this.swipeLimit, Math.abs(this.distanceX));
  }
  get directionX(): number {
    return Math.sign(this.distanceX);
  }

  @action
  didInsert(element: HTMLElement) {
    this.wrappingElement = element;
  }
  @action
  findTopSwipeable(event: Event) {
    let target = event.target as HTMLElement;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (Array.from(target.classList).includes('swipeable')) {
        return target;
      }

      const { parentElement } = target;
      if (!parentElement) {
        return null;
      }

      target = parentElement;
    }
  }
  @action
  panStart({ originalEvent }: PanEvent): void {
    if (this.findTopSwipeable(originalEvent) !== this.wrappingElement) {
      return;
    }

    this.isSwiping = true;
    this.distanceX = 0;
  }
  @action
  panMove({
    current: { distanceX, distanceY },
    originalEvent
  }: PanEvent): void {
    if (this.findTopSwipeable(originalEvent) !== this.wrappingElement) {
      return;
    }

    if (this.isSwiping) {
      this.distanceX = distanceX;
      if (Math.abs(distanceY) > this.swipeLimit / 2) {
        this.isSwiping = false;
        this.distanceX = 0;
      }
    }
  }
  @action
  panEnd({ originalEvent }: PanEvent): void {
    if (this.findTopSwipeable(originalEvent) !== this.wrappingElement) {
      return;
    }

    this.isSwiping = false;
    if (this.offsetX === this.swipeLimit) {
      if (this.directionX > 0) {
        this.args.swipeRight();
      } else {
        this.args.swipeLeft();
      }
    }
    this.distanceX = 0;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Swipeable: typeof SwipeableComponent;
  }
}
