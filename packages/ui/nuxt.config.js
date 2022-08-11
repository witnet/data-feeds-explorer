import axios from 'axios'
import { languages } from './constants'
import { fallbackLocale, defaultLocale } from './default'
import { getFeedDescription } from './utils/getFeedDescription'

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
        content: '~/assets/images/meta-image.png',
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
        content: '~/assets/images/meta-image.png',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: '~/assets/images/meta-image.png',
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
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main.scss', '~/assets/styles/element-ui.scss'],
  // You will have to add this new object if it doesn't exist already
  styleResources: {
    scss: ['~/assets/styles/main.scss', '~/assets/styles/element-ui.scss'],
  },
  // ...
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    '@nuxtjs/apollo',
    'nuxt-element-ui',
    '@nuxtjs/feed',
  ],

  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {
        let dataFeeds
        feed.options = {
          title: 'Witnet Data Feed Explorer',
          link: 'https://feeds.witnet.io/feed.xml',
          description: 'This is the Witnet data feed explorer feed!',
        }
        const feedsQuery = `query feeds {
          feeds (network: "all") {
            feeds {
              feedFullName
              name
              chain
              logo
              networkName
              heartbeat
              finality
              deviation
              isRouted
            }
            total
          }
        }`
        await axios({
          url: process.env.API_ENDPOINT,
          method: 'post',
          data: {
            query: feedsQuery,
          },
        }).then((result) => {
          dataFeeds = result.data.data.feeds.feeds
        })
        if (dataFeeds) {
          dataFeeds.forEach((dataFeed) => {
            const url = `https://feeds.witnet.io/${dataFeed.chain.toLowerCase()}/${
              dataFeed.feedFullName
            }`
            feed.addItem({
              author: dataFeed.authors,
              description: getFeedDescription(dataFeed),
              id: dataFeed.feedFullName,
              link: url,
              title: `${dataFeed.name.toUpperCase()} data feed available on ${
                dataFeed.networkName
              }`,
            })
          })
        }
      }, // The create function (see below)
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      data: ['Some additional data'], // Will be passed as 2nd argument to `create` function
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
    strategy: 'prefix_and_default',
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
