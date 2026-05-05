import airbnb from 'eslint-config-xaxa/airbnb';
import globals from 'globals';

export default airbnb(
  {
  // airbnb options
  },
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      'import/extensions': ['off'],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'eslint.config.js',
            'webpack.config.cjs',
            '**/*.test.js',
          ],
        },
      ],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      'prefer-named-capture-group': ['error'],
      'require-unicode-regexp': ['error'],
      'sort-keys': ['error'],
    },
  },
  // {
  //   languageOptions: {
  //     // globals: {
  //     //   ...globals.node,
  //     // },
  //   },
  // },
  {
    files: ['**/*.test.js', 'jest/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.cjs'],
    rules: {
      'import/no-commonjs': ['off'],
    },
  },
  // project specific
  {
    rules: {
      'import/no-commonjs': ['off'],
    },
  },
);
