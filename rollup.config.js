import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/Dataset.vue',
  output: [
    {
      file: './dist/vue-dataset.es.js',
      format: 'es',
      sourcemap: true,
      sourcemapExcludeSources: false
    },
    {
      file: './dist/vue-dataset.umd.min.js',
      format: 'umd',
      name: 'VueDataset',
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
    css({
      output: 'dist/vue-dataset.css'
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
