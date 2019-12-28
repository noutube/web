module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    'ember',
    'ember-suave'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/no-jquery': 'error',
    'no-unused-vars': ['error', { args: 'none' }], // ignore arguments since we can't mark unused with underscores
    'semi': ['error', 'always'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'camelcase': 'off', // we need camelcase for API interaction
    'no-console': 'off', // see https://github.com/emberjs/rfcs/pull/176#issuecomment-272566327
    'keyword-spacing': ['error', { overrides: { catch: { after: true } } }],
    'lines-between-class-members': 'off',
    'padding-line-between-statements': 'off',
    'import/no-relative-parent-imports': 'off'
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
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
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      })
    }
  ]
};
