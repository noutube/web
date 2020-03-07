'use strict';

module.exports = {
  extends: ['octane', 'stylistic'],
  rules: {
    'no-inline-styles': { allowDynamicStyles: true },
    // stylistic requires editorconfig
    'eol-last': ['error']
  }
};
