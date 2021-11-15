module.exports = {
  extends: ['standard-with-typescript', 'standard-react'],
  parserOptions: {
    project: [
      './tsconfig.json'
    ]
  },
  env: {
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/require-await': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-closing-bracket-location': 'warn',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off'
  }
}
