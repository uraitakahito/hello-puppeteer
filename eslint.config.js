import globals from "globals"
import js from '@eslint/js';
import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
    ignores: [
      "**/fixtures/**",
      "**/dist/**",
      "node_modules/*"
    ]
  },
  js.configs.recommended,
  {
    files: [
      "**/*.cjs",
      "**/*.js"
    ],
    languageOptions: {
      globals: {
        ...globals.node
      },
    },
    plugins: {
      jsdoc: jsdoc
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error"
    }
  }
];
