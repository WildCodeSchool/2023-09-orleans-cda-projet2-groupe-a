/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:workspaces/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-console': 'warn',
        'no-extra-boolean-cast': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'parameter',
            format: ['camelCase', 'PascalCase', 'snake_case'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'memberLike',
            format: ['camelCase', 'UPPER_CASE', 'snake_case'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase'],
          },
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
          },
          {
            selector: [
              'classProperty',
              'objectLiteralProperty',
              'typeProperty',
              'classMethod',
              'objectLiteralMethod',
              'typeMethod',
              'accessor',
              'enumMember',
            ],
            format: null,
            modifiers: ['requiresQuotes'],
          },
        ],
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            ignoreIIFE: true,
          },
        ],
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/no-unnecessary-qualifier': 'warn',
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'warn',
        'react/boolean-prop-naming': [
          'error',
          {
            propTypeNames: [
              'boolean',
              'bool',
              'true',
              'false',
              'Bool',
              'Boolean',
            ],
            rule: '^(is|should|has|can|did|will)[A-Z]([A-Za-z0-9]?)+',
            message:
              "Boolean prop should start with 'is' or 'has' and be camelCased",
            validateNested: true,
          },
        ],
        'react/button-has-type': 'warn',
        'react/default-props-match-prop-types': 'error',
        'react/destructuring-assignment': 'error',
        'react/hook-use-state': 'error',
        'react/iframe-missing-sandbox': 'error',
        'react/jsx-boolean-value': ['warn', 'never'],
        'react/jsx-closing-bracket-location': 'warn',
        'react/jsx-closing-tag-location': 'warn',
        'react/jsx-curly-brace-presence': [
          'warn',
          {
            props: 'ignore',
            children: 'always',
            propElementValues: 'always',
          },
        ],
        'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.tsx'],
          },
        ],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-key': 'error',
        'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
        'react/jsx-no-constructed-context-values': 'error',
        'react/jsx-no-leaked-render': 'error',
        'react/jsx-no-literals': 'warn',
        'react/jsx-no-script-url': 'error',
        'react/jsx-no-target-blank': 'warn',
        'react/jsx-no-undef': 'warn',
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-pascal-case': 'error',
        'react/jsx-props-no-multi-spaces': 'warn',
        'react/jsx-tag-spacing': [
          'error',
          {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never',
          },
        ],
        'react/jsx-uses-react': 'error',
        'react/jsx-wrap-multilines': [
          'error',
          {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
          },
        ],
        'react/no-array-index-key': 'warn',
        'react/no-children-prop': 'error',
        'react/no-danger': 'error',
        'react/no-invalid-html-attribute': 'error',
        'react/no-this-in-sfc': 'error',
        'react/no-unstable-nested-components': 'error',
        'react/no-unused-prop-types': 'warn',
        'react/prefer-read-only-props': 'warn',
        'react/prefer-stateless-function': 'error',
        'react/self-closing-comp': [
          'warn',
          {
            component: true,
            html: true,
          },
        ],
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',
        'unicorn/prevent-abbreviations': [
          'error',
          {
            ignore: [
              'env',
              'acc',
              'curr',
              'prev',
              'val',
              'props',
              'Props',
              'ref',
              'ctx',
              'req',
              'res',
              'db',
              'Db',
              'DB',
              'err',
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              pascalCase: true,
            },
            ignore: ['main.tsx', 'router.tsx'],
          },
        ],
      },
    },
    {
      files: ['**/*.ts'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              kebabCase: true,
            },
          },
        ],
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/'],
  plugins: ['react', 'react-refresh', 'workspaces'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
