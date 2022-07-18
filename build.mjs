import buble from '@rollup/plugin-buble'
import { build } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const sources = [
  'src/index.js',
  'src/Dataset.vue',
  'src/DatasetInfo.vue',
  'src/DatasetItem.vue',
  'src/DatasetPager.vue',
  'src/DatasetSearch.vue',
  'src/DatasetShow.vue'
]

const buildOne = async (emptyOutDir, minify, format, source) => {
  const name =
    source === 'src/index.js' && format === 'umd'
      ? 'VueDataset'
      : source.split('/').pop().replace('.vue', '').replace('.js', '')

  const minifiedSuffix = minify ? '.min' : ''

  await build({
    publicDir: 'public-vite',
    plugins: [
      createVuePlugin(),
      buble({
        exclude: 'node_modules/**'
      })
    ],
    build: {
      emptyOutDir,
      minify,
      lib: {
        formats: [format],
        entry: resolve(__dirname, source),
        name,
        fileName: () => `${format}/${name}${minifiedSuffix}.js`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          sourcemap: true,
          sourcemapExcludeSources: false,
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  })
}

// Build ES
for (let index = 0; index < sources.length; index++) {
  const source = sources[index]
  const emptyOutDir = index === 0

  await buildOne(emptyOutDir, false, 'es', source)
}

// Build UMD
for (let index = 0; index < sources.length; index++) {
  const source = sources[index]

  // Build unminified assets
  await buildOne(false, false, 'umd', source)

  // Build minified assets
  await buildOne(false, true, 'umd', source)
}
