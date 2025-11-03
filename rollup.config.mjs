import buble from '@rollup/plugin-buble'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import del from 'rollup-plugin-delete'
import vue from 'rollup-plugin-vue'

const createSources = () => [
  './src/index.js',
  './src/Dataset.vue',
  './src/DatasetInfo.vue',
  './src/DatasetItem.vue',
  './src/DatasetPager.vue',
  './src/DatasetSearch.vue',
  './src/DatasetShow.vue',
]

const createPlugins = () => [
  nodeResolve(),
  vue({
    css: false,
  }),
  buble({
    exclude: 'node_modules/**',
  }),
]

const umdBuild = (minify) =>
  createSources().map((source) => {
    const name = source === './src/index.js' ? 'VueDataset' : source.split('/').pop().replace('.vue', '')
    const minifiedSuffix = minify ? '.min' : ''
    const plugins = createPlugins()

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
            vue: 'Vue',
          },
        },
      ],
      external: ['vue'],
      plugins,
    }
  })

const esBuild = () => {
  const plugins = createPlugins()

  plugins.unshift(del({ targets: 'dist/*' }))

  return [
    {
      input: createSources(),
      output: [
        {
          dir: 'dist/es',
          format: 'es',
          sourcemap: true,
          sourcemapExcludeSources: false,
        },
      ],
      external: ['vue'],
      plugins,
    },
  ]
}

export default [
  // ES
  ...esBuild(),

  // UMD
  ...umdBuild(),

  // UMD Minified
  ...umdBuild(true),
]
