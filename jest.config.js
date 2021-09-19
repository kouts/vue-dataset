module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@playground/(.*)$': '<rootDir>/playground/$1',
    '^@root/(.*)$': '<rootDir>/$1'
  }
}
