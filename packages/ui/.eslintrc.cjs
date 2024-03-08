/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     node: true,
//   },
//   parserOptions: {
//     parser: 'babel-eslint',
//   },
//   extends: [
//     '@nuxtjs/eslint-config-typescript',
//     'prettier',
//     'plugin:prettier/recommended',
//     'plugin:nuxt/recommended',
//   ],
//   plugins: ['prettier'],
//   // add your custom rules here
//   rules: {
//     // Delete this line if using <script setup>
//     'vue/script-setup-uses-vars': 'off',
//   },
// }

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'off',
  },
}
