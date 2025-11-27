// https://vitest.dev/guide/workspace
import { defineWorkspace } from 'vitest/config'

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  {
    test: {
      name: 'node',
      include: ['test/**/*.test.{ts,js,mjs}'],
      exclude: ['**/node_modules/**', '.Trash*/**'],
      environment: 'node',
      // setupFiles: ['./setup.init.js'],
    },
  },
])
