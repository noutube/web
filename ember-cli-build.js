'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    cssModules: {
      headerModules: [
        // @use needs to be the first thing in the concatenated file
        'noutube/styles/use',
        // need theme mixin available everywhere
        'noutube/styles/themes'
      ]
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg', 'map']
    }
  });

  return app.toTree();
};
