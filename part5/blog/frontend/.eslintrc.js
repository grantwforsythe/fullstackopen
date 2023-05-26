const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['react-app', 'airbnb', 'prettier'],
  plugins: ['jsx-a11y', 'prettier'],
  overrides: [],
  rules: {
    indent: ['error', ERROR, { SwitchCase: WARNING }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': OFF,
    'prettier/prettier': ['error', { endOfLine: 'crlf' }],
    'react/jsx-filename-extension': [
      WARNING,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/function-component-definition': [
      WARNING,
      { namedComponents: 'arrow-function' },
    ],
    'react/prop-types': OFF,
  },
};
