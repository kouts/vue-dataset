import * as path from 'path'
import * as url from 'url'
import VueExamplePlugin from 'vuepress-plugin-vue-example'
import { defaultTheme, defineUserConfig } from 'vuepress-webpack'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default defineUserConfig({
  plugins: [
    VueExamplePlugin({
      componentsPath: '/docs/.vuepress/components/'
    }),
    docsearchPlugin({
      apiKey: '1a6df20c3c6d9b729c4109ebce3e2eed',
      indexName: 'next-vue-dataset'
    })
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
        text: 'Introduction'
      },
      {
        link: '/installation/',
        text: 'Installation'
      },
      {
        link: '/components/',
        text: 'Components'
      },
      {
        text: 'Examples',
        collapsable: true,
        children: [
          {
            link: '/examples/cards/',
            text: 'Cards'
          },
          {
            link: '/examples/datatable/',
            text: 'Datatable'
          }
        ]
      }
    ]
  }),
  alias: {
    '@': path.resolve(__dirname, '../../src'),
    '@playground': path.resolve(__dirname, '../../playground'),
    '@root': path.resolve(__dirname, '../../')
  }
})
