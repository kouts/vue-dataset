import { minifyHtml, injectHtml } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  plugins: [
    vue(),
    minifyHtml(),
    injectHtml({
      injectData: {
        title: 'vue-dataset playground',
        description: 'Playground for vue-dataset Vue.js 3'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@playground': path.resolve(__dirname, './playground'),
      '@root': path.resolve(__dirname, './'),
      '~bootstrap': 'bootstrap'
    }
  },
  rollupInputOptions: {
    input: path.resolve(__dirname, '/playground/main.js') // custom main
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./playground/scss/variables";`
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueDataset',
      fileName: (format) => `vue-dataset.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
