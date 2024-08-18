import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  publicDir: 'public-vite',
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'vue-dataset playground',
          description: 'Playground for vue-dataset Vue.js 3',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@playground': resolve(__dirname, './playground'),
      '@root': resolve(__dirname, './'),
      '~bootstrap': 'bootstrap',
    },
  },
  rollupInputOptions: {
    input: resolve(__dirname, '/playground/main.js'), // custom main
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./playground/scss/variables";`,
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VueDataset',
      fileName: (format) => `vue-dataset.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    globals: true,
    // Clear the mocks call count before each test so that we don't have to call vi.clearAllMocks manually - https://vitest.dev/config/#clearmocks
    clearMocks: true,
    environment: 'jsdom',
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'json'],
    },
  },
})
