import tseslint from 'typescript-eslint'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  { files: ['**/*.ts'] },
  {
    ignores: ['node_modules', 'dist', 'src/generated'],
  },
  {
    languageOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-async-promise-executor': 'off',
    },
  },
]
