module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
      },
      parserOptions: {
        project: require.resolve(`${__dirname}/tsconfig.json`),
      },
    },
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'no-undef': 'error',
    '@next/next/no-html-link-for-pages': 'off',
    'max-len': [
      'error',
      {
        code: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        tabWidth: 2,
      },
    ],
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/components/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/layouts/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/views/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/pages/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/shared/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/utils/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/lib/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/actions/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/queries/**/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/styles/**/**',
            group: 'parent',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'error',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: require.resolve(`${__dirname}/tsconfig.json`),
      },
    },
  },
};
