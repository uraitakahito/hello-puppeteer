import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';

export default [
  // 除外パターン
  {
    ignores: [
      'node_modules/**',
      '.Trash*/**',
      '**/node_modules/**',
    ],
  },

  // 基本設定: ESLint推奨ルール
  js.configs.recommended,

  // import プラグイン
  importPlugin.flatConfigs.recommended,

  // プロジェクト共通設定
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
      },
    },
    rules: {
      'capitalized-comments': 'off',
      'func-style': 'off',
      'id-length': 'off',
      'line-comment-position': 'off',
      'multiline-comment-style': 'off',
      'no-console': 'off',
      'no-inline-comments': 'off',
      'no-ternary': 'off',
      'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
      'one-var': 'off',
      // puppeteer.launch() などの一般的なパターンを許可
      'import/no-named-as-default-member': 'off',
    },
  },

  // テストファイル用設定
  {
    files: ['test/**/*.{js,mjs}', 'test-jest/**/*.{js,mjs}', 'test-vitest/**/*.{js,mjs}'],
    ...vitest.configs.recommended,
    rules: {
      ...vitest.configs.recommended.rules,
      'no-magic-numbers': 'off',
    },
  },
];
