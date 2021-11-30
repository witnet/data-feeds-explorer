import { languages } from './constants'
import { fallbackLocale, defaultLocale } from './default'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  router: {
    base: '/',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Data Feeds Explorer | Witnet',
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
        content: 'Data Feeds Explorer | Witnet',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Explore the list of decentralized data feeds to connect your smart contracts to real world events, usingthe Witet oracle network',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Data Feeds Explorer | Witnet',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Explore the list of decentralized data feeds to connect your smart contracts to real world events, usingthe Witet oracle network',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'images/witnet_green.png',
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'Witnet data feeds explorer',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Data Feeds Explorer | Witnet',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Explore the list of decentralized data feeds to connect your smart contracts to real world events, usingthe Witet oracle network',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'images/witnet_green.png',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'images/witnet_green.png',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Witnet data feeds explorer',
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
  css: [
    '~/assets/styles/colors.scss',
    '~/assets/styles/main.scss',
    '~/assets/styles/element-ui.scss',
  ],
  // You will have to add this new object if it doesn't exist already
  styleResources: {
    scss: [
      '~/assets/styles/colors.scss',
      '~/assets/styles/main.scss',
      '~/assets/styles/element-ui.scss',
    ],
  },
  // ...
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    '@nuxtjs/apollo',
    'nuxt-element-ui',
  ],

  elementUI: {
    components: ['Pagination'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vueSelect.js', ssr: false },
    {
      src: '~/plugins/lightweightcharts.js',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', { path: '~/components/chart', extensions: ['vue'] }],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/date-fns',
    '@nuxtjs/color-mode',
    '@nuxtjs/fontawesome',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/svg',
  ],

  fontawesome: {
    icons: {
      solid: [
        'faMoon',
        'faSun',
        'faArrowAltCircleLeft',
        'faCopy',
        'faInfoCircle',
        'faExternalLinkAlt',
      ],
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
    defaultLocale,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
  apollo: {
    clientConfigs: {
      // load httpEndpoint on runtime to be able to read it from env variable
      default: '~/apollo.config.js',
    },
    errorHandler: '~/plugins/apollo-error-handler.js',
  },
  publicRuntimeConfig: {
    baseUrl: process.env.API_ENDPOINT,
  },
}
