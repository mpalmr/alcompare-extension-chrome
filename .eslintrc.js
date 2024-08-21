'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2024,
  },
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['airbnb-base'],
      parserOptions: { sourceType: 'script' },
      rules: {
        strict: [2, 'global'],
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
        }],
      },
    },
    {
      files: ['**/*.ts'],
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
      ],
      parserOptions: { project: './tsconfig.json' },
      rules: {
        'import/prefer-default-export': 0,
      },
    },
    {
      files: [
        'jest.setup.ts',
        './tests/**/*.spec.ts',
        '**/__tests__/**/*.ts',
      ],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
