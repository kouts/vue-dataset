import buble from '@rollup/plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import del from 'rollup-plugin-delete'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'

const sources = [
  './src/Dataset.vue',
  './src/DatasetInfo.vue',
  './src/DatasetItem.vue',
  './src/DatasetPager.vue',
  './src/DatasetSearch.vue',
  './src/DatasetShow.vue'
]

const commonPlugins = () => [
  resolve(),
  commonjs(),
  vue({
    css: false
  }),
  buble({
    exclude: 'node_modules/**'
  })
]

const umdSources = sources.slice()

umdSources.unshift('./src/index.js')

const umdBuild = (minify) =>
  umdSources.map((source) => {
    const name = source === './src/index.js' ? 'VueDataset' : source.split('/').pop().replace('.vue', '')
    const minifiedSuffix = minify ? '.min' : ''
    const plugins = commonPlugins()

    if (minify) {
      plugins.push(terser())
    }

    return {
      input: source,
      output: [
        {
          file: `./dist/umd/${name}${minifiedSuffix}.js`,
          format: 'umd',
          name,
          sourcemap: true,
          sourcemapExcludeSources: false,
          globals: {
            vue: 'Vue'
          }
        }
      ],
      external: ['vue'],
      plugins
    }
  })

const esBuild = () => {
  const plugins = commonPlugins()

  plugins.unshift(del({ targets: 'dist/*' }))

  return [
    {
      input: ['./src/index.js'].concat(sources),
      output: [
        {
          dir: 'dist/es',
          format: 'es',
          sourcemap: true,
          sourcemapExcludeSources: false
        }
      ],
      external: ['vue'],
      plugins
    }
  ]
}

export default [
  // ES
  ...esBuild(),

  // UMD
  ...umdBuild(),

  // UMD Minified
  ...umdBuild(true)
]
