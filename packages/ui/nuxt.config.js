// import { createFeed } from './rss/createFeed'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import graphql from '@rollup/plugin-graphql'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/color-mode'],
  nitro: {
    prerender: {
      routes: ['/rss.xml'],
    },
  },
  // server: {
  //   port: 8080,
  //   host: '0',
  // },
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'server',
  // telemetry: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  // TODO: https://nuxt.com/docs/migration/meta
  // head: {
  //   title: 'Data Feeds Explorer | Witnet',
  //   htmlAttrs: {
  //     lang: 'en',
  //   },
  //  meta: [
  //    { charset: 'utf-8' },
  //    {
  //      name: 'viewport',
  //      content: 'viewport-fit=cover, width=device-width, initial-scale=1',
  //    },
  //    {
  //      hid: 'title',
  //      name: 'title',
  //      content: 'Data Feeds Explorer | Witnet',
  //    },
  //    {
  //      hid: 'description',
  //      name: 'description',
  //      content:
  //        'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
  //    },
  //    {
  //      hid: 'twitter:title',
  //      name: 'twitter:title',
  //      content: 'Data Feeds Explorer | Witnet',
  //    },
  //    {
  //      hid: 'twitter:description',
  //      name: 'twitter:description',
  //      content:
  //        'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
  //    },
  //    {
  //      hid: 'twitter:image',
  //      name: 'twitter:image',
  //      content: 'https://feeds.witnet.io/meta-image.png',
  //    },
  //    {
  //      hid: 'twitter:image:alt',
  //      name: 'twitter:image:alt',
  //      content: 'Witnet data feeds explorer',
  //    },
  //    {
  //      hid: 'og:title',
  //      property: 'og:title',
  //      content: 'Data Feeds Explorer | Witnet',
  //    },
  //    {
  //      hid: 'og:description',
  //      property: 'og:description',
  //      content:
  //        'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
  //    },
  //    {
  //      hid: 'og:image',
  //      property: 'og:image',
  //      content: 'https://feeds.witnet.io/meta-image.png',
  //    },
  //    {
  //      hid: 'og:image:secure_url',
  //      property: 'og:image:secure_url',
  //      content: 'https://feeds.witnet.io/meta-image.png',
  //    },
  //    {
  //      hid: 'og:image:alt',
  //      property: 'og:image:alt',
  //      content: 'Witnet data feeds explorer',
  //    },
  //  ],
  //   link: [
  //     { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/favicon.ico' },
  //     {
  //       rel: 'icon',
  //       sizes: '180x180',
  //       href: '/apple-touch-icon.png',
  //       type: 'image/png',
  //     },
  //     {
  //       rel: 'icon',
  //       sizes: '32x32',
  //       href: '/favicon-32x32.png',
  //       type: 'image/png',
  //     },
  //     {
  //       rel: 'icon',
  //       sizes: '16x16',
  //       href: '/favicon-16x16.png',
  //       type: 'image/png',
  //     },
  //     { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
  //     { rel: 'manifest', href: '/site.webmanifest' },
  //     { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '2D2C39' },
  //     { rel: 'msapplication-TileColor', content: '2D2C39' },
  //     { rel: 'shortcut icon', href: '/favicon.ico' },
  //   ],
  // },
  // feed: [
  //   {
  //     path: '/feed.xml',
  //     async create(feed) {
  //       await createFeed(feed)
  //     }, // The create function (see below)
  //     cacheTime: 24 * 60 * 60 * 1000, // 24h
  //     type: 'rss2', // Can be: rss2, atom1, json1
  //     // This field is mandatory to make the rss work
  //     data: [],
  //   },
  // ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
      { path: '~/components/chart', pathPrefix: false },
      { path: '~/components/breadcrumbs', pathPrefix: false },
      { path: '~/components/cards', pathPrefix: false },
      { path: '~/components/footer', pathPrefix: false },
    ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   '@nuxtjs/color-mode',
  //   '@nuxtjs/fontawesome',
  //   // https://go.nuxtjs.dev/eslint
  //   '@nuxtjs/eslint-module',
  //   // https://go.nuxtjs.dev/stylelint
  //   '@nuxtjs/stylelint-module',
  //   '@nuxtjs/svg',
  // ],
  // fontawesome: {
  //   icons: {
  //     solid: [
  //       'faMoon',
  //       'faSun',
  //       'faArrowAltCircleLeft',
  //       'faCopy',
  //       'faInfoCircle',
  //       'faExternalLinkAlt',
  //       'faAngleLeft',
  //       'faAngleRight',
  //     ],
  //   },
  // },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  // content: {},
  // locales: languages,
  // defaultLocale: fallbackLocale,
  // vueI18n: {
  //   messages: {
  //     en: require('./locales/en.json'),
  //     es: require('./locales/es.json'),
  //   },
  // },

  // add SEO attributes in layout head for better performance
  // baseUrl: 'https://feeds.witnet.io',
  // seo: false,
  // detectBrowserLanguage: {
  //   useCookie: true,
  //   cookieKey: 'i18n_redirected',
  //   onlyOnRoot: true,
  //   alwaysRedirect: true,
  // },
  // strategy: 'prefix_and_default',
  apollo: {
    clients: {
      // load httpEndpoint on runtime to be able to read it from env variable
      default: {
        httpEndpoint: import.meta.env.VITE_API_ENDPOINT,
        // uri: import.meta.env.VITE_API_ENDPOINT,
      },
    },
  },
  // TODO: error handler
  // errorHandler: '~/plugins/apollo-error-handler.js',
  vite: {
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    plugins: [
      VueI18nVitePlugin(
        {
          include: [
            resolve(
              dirname(fileURLToPath(import.meta.url)),
              './locales/*.json'
            ),
          ],
        },
        graphql()
      ),
    ],
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  imports: {
    dirs: ['./stores'],
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
    ],
  },
})
