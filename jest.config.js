module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageReporters: ['text', 'json-summary'],
}
