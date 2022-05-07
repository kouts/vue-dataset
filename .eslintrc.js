module.exports = {
  extends: ['eslint-config-kouts/vue3'],
  overrides: [
    {
      // Disable multi-word-component-names
      files: ['playground/**/*.{vue,js}', 'src/**/*.vue', 'docs/**/*.{vue,js}'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
