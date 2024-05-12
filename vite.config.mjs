import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  publicDir: 'public-vite',
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'vue-dataset playground',
          description: 'Playground for vue-dataset Vue.js 3'
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@playground': resolve(__dirname, './playground'),
      '@root': resolve(__dirname, './'),
      '~bootstrap': 'bootstrap'
    }
  },
  rollupInputOptions: {
    input: resolve(__dirname, '/playground/main.js') // custom main
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
      entry: resolve(__dirname, 'src/index.js'),
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
