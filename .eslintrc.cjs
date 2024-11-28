// > Use eslint v8 until such time as our configs support v9.
// https://github.com/airbnb/javascript/issues/2961
// Backwards compatibility utility is available
// https://eslint.org/blog/2022/08/new-config-system-part-2/#backwards-compatibility-utility

module.exports = {
  /*
   * https://github.com/eslint/eslintrc/blob/main/conf/environments.js
   */
  env: {
    '@vitest/env': true,
    browser: true,
    es2024: true,
    node: true,
  },

  /*
   * https://eslint.org/docs/v8.x/use/configure/configuration-files#extending-configuration-files
   */
  extends: [
    'eslint:all',
    // airbnb includes React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js
    // airbnb-base does not include React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/index.js
    'airbnb-base',
    // 'airbnb',
  ],

  /*
   * https://github.com/jest-community/eslint-plugin-jest
   */
  overrides: [
    {
      files: ['test/**', 'test-jest/**', 'test-vitest/**'],
      rules: {
        // Magic numbers are frequently used in tests, so disable this rule
        // https://eslint.org/docs/v8.x/rules/no-magic-numbers
        'no-magic-numbers': 'off',
      },
    },
    {
      //
      // https://github.com/vitest-dev/eslint-plugin-vitest
      // https://stackoverflow.com/a/78859495
      //
      extends: ['plugin:@vitest/legacy-all'],
      files: ['test/**', 'test-vitest/**'],
      plugins: ['@vitest'],
    },
  ],

  parserOptions: {
    // https://eslint.org/docs/v8.x/use/configure/language-options#specifying-parser-options
    sourceType: 'module',
  },

  rules: {
    // https://eslint.org/docs/v8.x/rules/capitalized-comments
    'capitalized-comments': 'off',
    // https://eslint.org/docs/v8.x/rules/func-style
    'func-style': 'off',
    // https://eslint.org/docs/v8.x/rules/id-length
    'id-length': 'off',
    // https://eslint.org/docs/v8.x/rules/line-comment-position
    'line-comment-position': 'off',
    // https://eslint.org/docs/v8.x/rules/multiline-comment-style
    'multiline-comment-style': 'off',
    // https://eslint.org/docs/v8.x/rules/no-console
    'no-console': 'off',
    // https://eslint.org/docs/v8.x/rules/no-inline-comments
    'no-inline-comments': 'off',
    // https://eslint.org/docs/v8.x/rules/no-ternary
    'no-ternary': 'off',
    // https://eslint.org/docs/v8.x/rules/one-var
    'one-var': 'off',
  },

  //
  // https://blog.kubosho.com/entries/eslint-plugin-import-error-on-vitest-configuration-file
  //
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
