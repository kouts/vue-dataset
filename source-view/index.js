const path = require('path');

module.exports = (options, context) => ({
  name: 'source-view',
  clientDynamicModules () {
    const opts = Object.assign({}, {
      componentsPath: '/docs/.vuepress/components'
    }, options);
    return {
      name: 'loadComponent.js',
      content: `
      export function loadComponent (file) {
        try {
          return import('${opts.componentsPath}' + file + '.vue').then(component => component.default);
        } catch (err) {
          console.log(err);
        }
      }
      `
    };
  },
  enhanceAppFiles: [path.resolve(__dirname, 'enhanceAppFile.js')],
  define: {
    SOURCE_VIEW_OPTIONS: JSON.stringify(options)
  }
});
