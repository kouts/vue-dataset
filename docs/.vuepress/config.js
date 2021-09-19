const path = require('path')
const VueExamplePlugin = require('../../vuepress-plugin-vue-example/index.js')

module.exports = {
  plugins: [
    VueExamplePlugin({
      componentsPath: '/docs/.vuepress/components/'
    })
  ],
  dest: 'public',
  title: 'vue-dataset',
  description: 'A vue component to display datasets with filtering, paging and sorting capabilities!',
  themeConfig: {
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
  },
  alias: {
    '@': path.resolve(__dirname, '../../src'),
    '@playground': path.resolve(__dirname, '../../playground'),
    '@root': path.resolve(__dirname, '../../')
  }
}
