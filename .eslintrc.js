module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    quotes: [1, 'single'],
    semi: 1,
    'no-irregular-whitespace': 2,
    'no-case-declarations': 0,
    'no-undef': 0,
    'eol-last': 1,
    'block-scoped-var': 2,
    'comma-dangle': [2, 'never'],
    'no-dupe-keys': 2,
    'no-empty': 1,
    'no-extra-semi': 2,
    'no-multiple-empty-lines': [
      1,
      {
        max: 1,
        maxEOF: 1
      }
    ],
    'no-trailing-spaces': 1,
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'no-unreachable': 1,
    'space-infix-ops': 1,
    'spaced-comment': 1,
    'no-var': 2,
    'no-multi-spaces': 2,
    'comma-spacing': 1,
    'simple-import-sort/imports': 'error'
    // 'simple-import-sort/export': 'error'
  }
};
