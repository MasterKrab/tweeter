module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'next/core-web-vitals',
    'standard',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@next/next/no-img-element': 'off',
    'import/no-anonymous-default-export': 'off',
    'no-undef': 'off',
    'react/no-unknown-property': 'off',
  },
}
