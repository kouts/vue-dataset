module.exports = {
  dest: 'public',
  title: 'vue-dataset',
  description: 'A vue component to display datasets with filtering, paging and sorting capabilities!',
  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/kouts/vue-dataset' }
    ],
    sidebar: [
      ['/', 'Introduction'],
      /*
      ['/installation/', 'Installation'],
      ['/usage/', 'Usage'],
      ['/options/', 'Options']
      */
    ]
  },
  head: [
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Array.from' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Promise' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=NodeList.prototype.forEach' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Object.assign' }
    ]
  ]
};
