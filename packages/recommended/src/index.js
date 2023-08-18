// index.js
module.exports = {
  configs: {
    recommended: {
      env: {
        browser: true,
        es2021: true
      },
      extends: [
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
      ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: ['vue', '@typescript-eslint', 'prettier', 'simple-import-sort', 'import'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-empty-function': 0,
        'vue/multi-word-component-names': 0,
        quotes: [1, 'single'],
        semi: 1,
        'no-irregular-whitespace': 2,
        'no-case-declarations': 0,
        'no-undef': 0,
        'eol-last': 1,
        'block-scoped-var': 2,
        'comma-dangle': [2, 'never'],
        'no-dupe-keys': 2,
        'no-empty': 0,
        'no-extra-semi': 2,
        'no-multiple-empty-lines': [1, { max: 1, maxEOF: 1 }],
        'no-trailing-spaces': 1,
        'semi-spacing': [2, { before: false, after: true }],
        'no-unreachable': 1,
        'space-infix-ops': 1,
        'spaced-comment': 1,
        'no-var': 2,
        'no-multi-spaces': 2,
        'comma-spacing': 1,
        'simple-import-sort/imports': 'error',
        'sort-imports': 'off',
        'import/order': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'space-before-function-paren': 0
      }
    }
  }
};
