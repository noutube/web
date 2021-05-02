'use strict';

module.exports = {
  extends: ['recommended', 'stylistic'],
  rules: {
    'no-inline-styles': { allowDynamicStyles: true },
    // stylistic requires editorconfig
    'eol-last': ['error']
  }
};
