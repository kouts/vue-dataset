const path = require('path');

module.exports = (options, context) => ({
  name: 'vue-example',
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
      export function loadComponentAsString (file) {
        try {
          return import(/* webpackChunkName: "vue-examples-source" */ /* webpackMode: "lazy-once" */ '!raw-loader!${opts.componentsPath}' + file + '.vue')
          .then(component => component.default);
        } catch (err) {
          console.log(err);
        }        
      }
      `
    };
  },
  enhanceAppFiles: [path.resolve(__dirname, 'enhanceAppFile.js')]
});
