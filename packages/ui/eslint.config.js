import globals from 'globals/index.js'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import { createBasicNuxtConfig } from 'nuxt-module-eslint-config/config'

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...createBasicNuxtConfig({
    features: {
      setup: true,
    },
    dirs: {
      pages: ['pages'],
      composables: ['composables', 'utils'],
      components: [],
      layouts: ['layouts'],
      plugins: ['plugins'],
      middleware: ['middleware'],
      modules: ['modules'],
      layers: [''],
      servers: [],
      src: './',
    },
  }),
  {
    files: ['pages/*.vue', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: {
          espree: true,
          ts: tseslint.parser,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },
]
