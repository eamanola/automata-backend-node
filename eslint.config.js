// import airbnb from 'eslint-config-xaxa/airbnb';
import airbnb from 'eslint-stylistic-airbnb';
import { configs as importX } from 'eslint-plugin-import-x';
import globals from 'globals';

export default [
  {
    ignores: ['dist/*'],
  },
  airbnb.configs['flat/strict'],
  importX['flat/recommended'],
  // requires eslint-plugin-import-x
  airbnb.configs['flat/addon-import'],
  {
    // eslint-stylistic-airbnb deprecated overrides
    rules: {
      '@stylistic/line-comment-position': [
        'error',
        {
          applyDefaultIgnorePatterns: true,
          ignorePattern: '',
          position: 'above',
        },
      ],
    },
  },
  {
    rules: {
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
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'eslint.config.js',
            'webpack.config.cjs',
            '**/*.test.js',
            './bin/download-memory-server-binaries.js',
          ],
        },
      ],
    },
  },
];
