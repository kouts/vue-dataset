import { viteBundler } from '@vuepress/bundler-vite'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { defaultTheme } from '@vuepress/theme-default'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineUserConfig } from 'vuepress'
import { vueExamplePlugin } from 'vuepress-plugin-vue-example'

const examplesDir = fileURLToPath(new URL('./components', import.meta.url))

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineUserConfig({
  bundler: viteBundler(),
  plugins: [
    registerComponentsPlugin({
      componentsDir: examplesDir,
    }),
    vueExamplePlugin({
      componentsDir: examplesDir,
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
    themePlugins: {
      prismjs: {
        theme: 'tomorrow',
      },
    },
  }),
  alias: {
    '@': resolve(__dirname, '../../src'),
    '@playground': resolve(__dirname, '../../playground'),
    '@root': resolve(__dirname, '../../'),
  },
})
