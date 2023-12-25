'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: ['ember', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'import/order': [
      'error',
      {
        // parent is abused to mean parts of ember
        groups: ['parent', 'external', 'internal'],
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            group: 'parent',
            pattern: '{@ember-data,@ember,@glimmer,@glint,ember-data}/**'
          },
          {
            group: 'parent',
            pattern: '{handlebars,rsvp}'
          },
          {
            group: 'internal',
            pattern: 'noutube/**'
          }
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.stylelintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      }
    },
    // typescript files
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-empty-interface': [
          'error',
          { allowSingleExtends: true }
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { args: 'none', ignoreRestSiblings: true }
        ], // ignore arguments
        'prefer-rest-params': 'off' // need super(...arguments)
      }
    }
  ]
};
