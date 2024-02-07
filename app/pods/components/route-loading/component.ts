import Component from '@glimmer/component';

export default class RouteLoadingComponent extends Component {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    RouteLoading: typeof RouteLoadingComponent;
  }
}
