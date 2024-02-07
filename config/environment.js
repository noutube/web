'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'noutube',
    podModulePrefix: 'noutube/pods',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    backendOrigin: 'http://localhost:9292',

    themes: [
      { value: 'light', label: 'Solarized Light' },
      { value: 'dark', label: 'Solarized Dark' },
      { value: 'gruvbox-light', label: 'Gruvbox Light' },
      { value: 'gruvbox-dark', label: 'Gruvbox Dark' }
    ],
    sizes: [360, 480, 720, 1080],
    videoKeys: [
      { value: 'age', label: 'age' },
      { value: 'sortableTitle', label: 'title' },
      { value: 'duration', label: 'duration' }
    ],
    channelKeys: [
      { value: 'sortableTitle', label: 'title' },
      { value: 'totalDuration', label: 'total duration' },
      { value: 'videoCount', label: 'number of videos' }
    ],
    dirs: [
      { value: 'asc', label: 'ascending' },
      { value: 'desc', label: 'descending' }
    ],
    defaultChannelGroup: true,
    defaultAutoplay: false,
    speeds: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    defaultSpeed: 1
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.backendOrigin = 'https://api.noutu.be';
  }

  return ENV;
};
