/* eslint ember/no-classic-components: 'off', ember/require-tagless-components: 'off' */

import Component from '@ember/component';
import { inject as service } from '@ember/service';

import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default class RouteApplicationComponent extends Component.extend(RecognizerMixin) {
  @service session;

  recognizers = 'pan';
}
