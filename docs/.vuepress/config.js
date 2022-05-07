const path = require('path')
const VueExamplePlugin = require('vuepress-plugin-vue-example')
const { defaultTheme } = require('vuepress-webpack')
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')

module.exports = {
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
    darkMode: false,
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
}
