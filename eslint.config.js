import { config } from '@kouts/eslint-config'

export default [
  ...config({
    ts: false,
  }),
  {
    name: 'project-ignores',
    ignores: ['!/docs/.vuepress'],
  },
  {
    name: 'project-overrides',
    files: ['playground/**/*.{vue,js}', 'src/**/*.vue', 'docs/**/*.{vue,js}'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
