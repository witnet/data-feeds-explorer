import { languages } from './constants'
import { fallbackLocale } from './default'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  router: {
    base: '/',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'new-website',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#0094a8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'title',
        name: 'title',
        content: 'title',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'description',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'title',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'description',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/',
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'alt',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'title',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'description',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: '/',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'EXAMPLE',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/colors.scss', '~/assets/styles/main.scss'],
  // You will have to add this new object if it doesn't exist already
  styleResources: {
    scss: ['~/assets/styles/colors.scss', '~/assets/styles/main.scss'],
  },
  // ...
  modules: ['@nuxtjs/style-resources', 'nuxt-i18n'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/fontawesome',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  fontawesome: {
    icons: {
      solid: ['faMoon', 'faSun'],
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},
  i18n: {
    // add SEO attributes in layout head for better performance
    seo: false,
    locales: languages,
    vueI18n: {
      fallbackLocale,
      messages: {
        en: require('./locales/en.json'),
        es: require('./locales/es.json'),
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
      alwaysRedirect: true,
    },
    defaultLocale: 'en',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
