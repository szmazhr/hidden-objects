module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'prettier'],
  rules: {
    // prettier
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',

    // mainly for required() method in webpack.conf
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
