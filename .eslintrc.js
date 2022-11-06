module.exports = {
  extends: ['@kouts/eslint-config/vue2'],
  overrides: [
    {
      // Disable multi-word-component-names for docs examples
      files: ['docs/.vuepress/**/*.{js,vue}', 'src/*.{js,vue}'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
