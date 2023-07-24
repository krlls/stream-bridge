require('@rushstack/eslint-patch/modern-module-resolution');

const patch = new Array(10).fill(null).map((_, i) => '../'.repeat(i + 1)).join(',');
const FILE_PATCH = `.,..,${patch.slice(1, -1)}`

module.exports = {
  root: true,
  globals: {
    'process': true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'quotes': ['error', 'single'],
    'no-unused-vars': 'off',
    'no-dupe-else-if': 'off',
    'no-console': ['error'],
    'no-debugger': ['error'],
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '_' }],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      },
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: 'class', next: '*' },
      { blankLine: 'always', prev: 'expression', next: '*' },
      { blankLine: 'any', prev: 'expression', next: 'expression' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
    ],
    '@typescript-eslint/member-ordering': 'error',
    'import/order': [
      'error',
      {
        'pathGroups': [
          {
            'pattern': `{${FILE_PATCH}}/types`,
            'group': 'internal'
          },
        ],
        'newlines-between': 'always',
        'groups': ['external', 'index', 'internal', ['parent', 'sibling']]
      }
    ],
  },
  overrides: [
    {
      'files': ['**/*.ts', '**/*.tsx',  '**/*.*.tsx'],
    }
  ],
  ignorePatterns: ['**/eslint-config-custom/**', '**/eslint.*']
};
