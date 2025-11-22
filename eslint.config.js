import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import ts from 'typescript-eslint'

import js from '@eslint/js'

const groups = [
  'error',
  {
    groups: [
      ['^\\w'],
      ['^@\\w'],
      ['^@/'],
      ['^\\.u0000'],
      ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
      ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
    ]
  }
]

export default ts.config({
  files: ['**/*.{js,ts}'],
  extends: [js.configs.recommended, ...ts.configs.recommended],
  rules: {
    'simple-import-sort/imports': groups,
    'simple-import-sort/exports': 'error'
  },
  languageOptions: {
    parser: ts.parser,
    globals: {
      ...globals.node
    }
  },
  plugins: {
    'simple-import-sort': simpleImportSort
  }
})
