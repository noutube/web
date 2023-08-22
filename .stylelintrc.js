'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-sass-guidelines',
    'stylelint-config-concentric-order',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'max-nesting-depth': null,
    'order/order': null,
    'order/properties-alphabetical-order': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'selector-max-compound-selectors': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] }
    ]
  }
};
