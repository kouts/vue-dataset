import { config } from '@kouts/eslint-config'

export default [
  ...config({
    vueVersion: 2,
    ts: false,
    env: ['browser'],
    globals: {
      jest: 'readonly',
    },
  }),
  {
    name: 'project-ignores',
    ignores: ['fixtures/**', 'page/**'],
  },
  {
    name: 'project-rules',
    // Disable multi-word-component-names
    files: ['src/**/*.vue', 'docs/**/*.{vue,js}'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    name: 'docs-overrides',
    // Disable vue/require-name-property and vue/no-static-inline-styles in docs
    files: ['docs/**/*.vue'],
    rules: {
      'vue/require-name-property': 'off',
      'vue/no-static-inline-styles': 'off',
    },
  },
]
