module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020
  },
  globals: {
    'module': true,
    'require': true,
    'process': true
  },
  overrides: [
    {
      'files': ['*data.json'],
      'rules': {
        'quotes': [2, 'double']
      }
    }
  ],
  rules: {
    // Windows style line breaks
    'linebreak-style': 0,

    // Console and debugger settings depending whether we're on production or not
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Custom for vue/recommended preset
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',

    // Custom rules standard
    semi: ['error', 'always'],
  },
};
