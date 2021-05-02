'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-concentric-order'
  ],
  rules: {
    'max-nesting-depth': null,
    'order/order': null,
    'order/properties-alphabetical-order': null,
    'selector-max-compound-selectors': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] }
    ]
  }
};
