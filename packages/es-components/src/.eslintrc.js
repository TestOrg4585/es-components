module.exports = {
  extends: ['plugin:jsx-a11y/recommended', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['import', 'react', 'babel', 'jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      destructuring: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'max-len': 0,
    'jsx-a11y/img-uses-alt': 0,
    'jsx-a11y/redundant-alt': 0,
    'jsx-a11y/valid-aria-role': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
    'react/forbid-prop-types': 0,
    'react/no-find-dom-node': 0,
    'react/jsx-no-bind': 0,
    'react/destructuring-assignment': 0,
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.specs.js',
          '**/ExampleWrapper.js',
          '**/test-utils.js'
        ]
      }
    ],
    'prefer-arrow-callback': 0,
    'id-length': 0
  },
  env: {
    browser: true
  }
};
