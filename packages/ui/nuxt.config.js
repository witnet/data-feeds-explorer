import { languages } from './constants'
import { fallbackLocale, defaultLocale } from './default'
import { createFeed } from './rss/createFeed'

export default {
  server: {
    port: 8080,
    host: '0'
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  router: {
    base: '/',
  },
  telemetry: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Data Feeds Explorer | Witnet',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'viewport-fit=cover, width=device-width, initial-scale=1',
      },
      {
        hid: 'title',
        name: 'title',
        content: 'Data Feeds Explorer | Witnet',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
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
          'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://feeds.witnet.io/meta-image.png',
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
          'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://feeds.witnet.io/meta-image.png',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://feeds.witnet.io/meta-image.png',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Witnet data feeds explorer',
      },
    ],
    link: [
      { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
        type: 'image/png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        href: '/favicon-32x32.png',
        type: 'image/png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        href: '/favicon-16x16.png',
        type: 'image/png',
      },
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '2D2C39' },
      { rel: 'msapplication-TileColor', content: '2D2C39' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
    ],
  },
  styleResources: {
    scss: ['~/assets/styles/main.scss', '~/assets/styles/element-ui.scss'],
  },
  // ...
  modules: ['nuxt-i18n', '@nuxtjs/apollo', 'nuxt-element-ui', '@nuxtjs/feed'],

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        await createFeed(feed)
      }, // The create function (see below)
      cacheTime: 24 * 60 * 60 * 1000, // 24h
      type: 'rss2', // Can be: rss2, atom1, json1
      // This field is mandatory to make the rss work
      data: [],
    },
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
    dirs: [
      '~/components',
      { path: '~/components/chart', extensions: ['vue'] },
      { path: '~/components/breadcrumbs', extensions: ['vue', 'js'] },
      { path: '~/components/cards', extensions: ['vue', 'js'] },
      { path: '~/components/footer', extensions: ['vue', 'js'] },
    ],
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
    '@nuxtjs/style-resources',
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
    baseUrl: 'https://feeds.witnet.io',
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
    strategy: 'prefix_and_default',
    defaultLocale,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
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
