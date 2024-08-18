import { webpackBundler } from '@vuepress/bundler-webpack'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { defaultTheme } from '@vuepress/theme-default'
import * as path from 'path'
import * as url from 'url'
import { defineUserConfig } from 'vuepress'
import { vueExamplePlugin } from 'vuepress-plugin-vue-example'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default defineUserConfig({
  plugins: [
    vueExamplePlugin({
      componentsPath: '/docs/.vuepress/components/',
    }),
    docsearchPlugin({
      apiKey: 'a05c686d69be9a09e66f93b07bc7f855',
      indexName: 'next-vue-dataset',
      appId: 'BAXEDGK9R9',
    }),
  ],
  dest: 'public',
  title: 'vue-dataset',
  description: 'A vue component to display datasets with filtering, paging and sorting capabilities!',
  bundler: webpackBundler({
    postcss: {},
    vue: {},
  }),
  theme: defaultTheme({
    contributors: false,
    repo: 'https://github.com/kouts/vue-dataset/tree/next',
    colorMode: 'light',
    colorModeSwitch: false,
    sidebar: [
      {
        link: '/',
        text: 'Introduction',
      },
      {
        link: '/installation/',
        text: 'Installation',
      },
      {
        link: '/components/',
        text: 'Components',
      },
      {
        text: 'Examples',
        collapsable: true,
        children: [
          {
            link: '/examples/cards/',
            text: 'Cards',
          },
          {
            link: '/examples/datatable/',
            text: 'Datatable',
          },
        ],
      },
    ],
  }),
  alias: {
    '@': path.resolve(__dirname, '../../src'),
    '@playground': path.resolve(__dirname, '../../playground'),
    '@root': path.resolve(__dirname, '../../'),
  },
})
