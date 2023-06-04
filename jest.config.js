module.exports = {
  testEnvironment: 'jsdom',
  // https://github.com/vuejs/vue-jest/issues/479#issuecomment-1163421581
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['vue', 'js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@playground/(.*)$': '<rootDir>/playground/$1',
    '^@root/(.*)$': '<rootDir>/$1'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageReporters: ['text', 'json-summary'],
  collectCoverageFrom: ['src/**', '!src/types/**', '!src/*/.eslintrc.js']
}
