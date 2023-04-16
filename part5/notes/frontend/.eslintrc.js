module.exports = {
  extends: ['react-app', 'airbnb', 'prettier'],
  plugins: ['jsx-a11y', 'prettier'],
  overrides: [],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'prettier/prettier': ['error', { endOfLine: 'crlf' }],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/function-component-definition': [
      1,
      { namedComponents: 'arrow-function' },
    ],
    'react/prop-types': 0,
  },
};
