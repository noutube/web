import EmberRouter from '@ember/routing/router';

import config from 'noutube/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('account');
  this.route('feed');
  this.route('landing');
  this.route('register');
  this.route('sign-in');
});
