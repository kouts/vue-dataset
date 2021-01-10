const path = require('path');

module.exports = (options) => ({
  name: 'source-view',

  enhanceAppFiles: [path.resolve(__dirname, 'enhanceAppFile.js')],

  define: {
    SOURCE_VIEW_OPTIONS: JSON.stringify(options)
  }
});
