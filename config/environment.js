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

    revision: 'dev',

    backendOrigin: 'http://localhost:9292',

    themes: [
      { value: 'light', label: 'Solarized Light' },
      { value: 'dark', label: 'Solarized Dark' },
      { value: 'gruvbox-light', label: 'Gruvbox Light' },
      { value: 'gruvbox-dark', label: 'Gruvbox Dark' }
    ],
    sizes: [
      { value: 360, label: '360p' },
      { value: 480, label: '480p' },
      { value: 720, label: '720p' },
      { value: 1080, label: '1080p' }
    ],
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
    speeds: [
      { value: 0.25, label: '0.25x' },
      { value: 0.5, label: '0.5x' },
      { value: 0.75, label: '0.75x' },
      { value: 1, label: '1x' },
      { value: 1.25, label: '1.25x' },
      { value: 1.5, label: '1.5x' },
      { value: 1.75, label: '1.75x' },
      { value: 2, label: '2x' }
    ],
    defaultSize: 360,
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
    ENV.revision = process.env.REVISION;
  }

  return ENV;
};
