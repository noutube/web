'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-concentric-order'
  ],
  rules: {
    'alpha-value-notation': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'function-no-unknown': null,
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
