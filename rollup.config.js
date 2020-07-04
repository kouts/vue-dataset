import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

const sources = [
  './src/Dataset.vue',
  './src/DatasetInfo.vue',
  './src/DatasetItem.vue',
  './src/DatasetPager.vue',
  './src/DatasetSearch.vue',
  './src/DatasetShow.vue'
];

const umdBuild = sources.map((source) => {
  const name = source.split('/').pop().replace('.vue', '');
  return {
    input: source,
    output: [
      {
        file: './dist/umd/' + name + '.js',
        format: 'umd',
        name: name,
        sourcemap: true,
        sourcemapExcludeSources: false,
        globals: {
          vue: 'Vue'
        }
      },
      {
        file: './dist/umd/' + name + '.min.js',
        format: 'umd',
        name: name,
        sourcemap: true,
        sourcemapExcludeSources: false,
        globals: {
          vue: 'Vue'
        }
      }
    ],
    external: [
      'vue'
    ],
    plugins: [
      resolve(),
      commonjs({
        namedExports: { 'vue-reactive-provide': ['ReactiveProvideMixin'] }
      }),
      vue({
        css: false
      }),
      buble(),
      terser({
        sourcemap: true,
        include: [/^.+\.min\.js$/]
      })
    ]
  };
});

export default [
  // ES
  {
    input: sources,
    output: [
      {
        dir: 'dist/es',
        format: 'es',
        sourcemap: true,
        sourcemapExcludeSources: false
      }
    ],
    external: [
      'vue'
    ],
    plugins: [
      resolve(),
      commonjs({
        namedExports: { 'vue-reactive-provide': ['ReactiveProvideMixin'] }
      }),
      css({
        output: 'dist/vue-dataset.css'
      }),
      vue({
        css: false
      })
    ]
  },
  // UMD
  ...umdBuild
];
