import Component from '@glint/environment-ember-loose/glimmer-component';

export type IconName =
  | 'bell'
  | 'bell-off'
  | 'bookmark'
  | 'chevron-right'
  | 'gift'
  | 'home'
  | 'inbox'
  | 'list'
  | 'loader'
  | 'lock'
  | 'log-in'
  | 'log-out'
  | 'maximize-2'
  | 'minimize-2'
  | 'play'
  | 'slash'
  | 'sliders'
  | 'square'
  | 'trash'
  | 'user'
  | 'user-minus'
  | 'user-plus'
  | 'x';

interface Signature {
  Args: {
    name: IconName;
    size?: number;
  };
  Element: SVGElement;
}

export default class SvgIconComponent extends Component<Signature> {
  get size(): number {
    return this.args.size ?? 24;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SvgIcon: typeof SvgIconComponent;
  }
}
