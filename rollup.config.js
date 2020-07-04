import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: [
    './src/Dataset.vue',
    './src/DatasetInfo.vue',
    './src/DatasetItem.vue',
    './src/DatasetPager.vue',
    './src/DatasetSearch.vue',
    './src/DatasetShow.vue'
  ],
  output: [
    {
      dir: 'dist',
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
};
