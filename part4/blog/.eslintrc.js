module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'prettier/prettier': ['error', { arrowParens: 'avoid', endOfLine: 'crlf' }],
  },
};
