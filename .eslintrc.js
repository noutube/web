'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false
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
            pattern: '{handlebars,rsvp,ember-modifier}'
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
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['n'],
      extends: ['plugin:n/recommended'],
      rules: {
        // add your custom rules and overrides for node files here
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
        'ember/no-array-prototype-extensions': 'error',
        'ember/no-empty-glimmer-component-classes': 'off', // needed for glint registry
        'prefer-rest-params': 'off' // need super(...arguments)
      }
    }
  ]
};
