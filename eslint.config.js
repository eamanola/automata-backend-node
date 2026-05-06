// import airbnb from 'eslint-config-xaxa/airbnb';
import airbnb from 'eslint-stylistic-airbnb';
import globals from 'globals';

export default [
  airbnb.configs['flat/strict'],
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      'array-element-newline': [
        'error',
        {
          ArrayExpression: 'consistent',
          ArrayPattern: { minItems: 3 },
        },
      ],
      'import/extensions': ['off'],
      // 'import/no-extraneous-dependencies': [
      //   'error',
      //   {
      //     devDependencies: [
      //       'eslint.config.js',
      //       'webpack.config.cjs',
      //       '**/*.test.js',
      //     ],
      //   },
      // ],
      'no-console': [
        'warn',
        {
          allow: [
            'info',
            'warn',
            'error',
          ],
        },
      ],
      'prefer-named-capture-group': ['error'],
      'require-unicode-regexp': ['error'],
      'sort-keys': ['error'],
    },
  },
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
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import/no-commonjs': ['off'],
    },
  },
];
