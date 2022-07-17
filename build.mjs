import { build } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { fileURLToPath } from 'url'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
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

const buildOne = async (emptyOutDir, format, source) => {
  const name =
    source === 'src/index.js' && format === 'umd'
      ? 'VueDataset'
      : source.split('/').pop().replace('.vue', '').replace('.js', '')

  await build({
    publicDir: 'public-vite',
    plugins: [createVuePlugin()],
    build: {
      emptyOutDir,
      minify: false,
      lib: {
        formats: [format],
        entry: resolve(__dirname, source),
        name,
        fileName: () => `${format}/${name}.js`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          plugins: [
            getBabelOutputPlugin({
              allowAllFormats: true,
              presets: [['@babel/preset-env', { ...(format === 'umd' && { modules: 'umd' }) }]]
            })
          ],
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

  await buildOne(emptyOutDir, 'es', source)
}

// Build UMD
for (let index = 0; index < sources.length; index++) {
  const source = sources[index]

  await buildOne(false, 'umd', source)
}
