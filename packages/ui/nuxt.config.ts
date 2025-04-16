import svgLoader from 'vite-svg-loader'
import { LANGUAGE_LOCALES } from './constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'default' },
    head: {
      title: 'Data Feeds Explorer | Witnet',
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
        { rel: 'shortcut icon', href: '/favicon.ico' },
      ],
    },
  },

  devtools: { enabled: true },
  components: [{ path: '~/components', pathPrefix: false }],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  gtag: {
    id: 'GTM-PT6DJRHL',
  },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    'nuxt-gtag',
  ],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },

  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'en-US',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected_2',
      redirectOn: 'root',
    },
    locales: Object.values(LANGUAGE_LOCALES),
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_ENDPOINT,
    },
  },

  css: [
    '~/assets/styles/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIds: false,
                },
              },
            },
          ],
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/colors.scss" as *; @use "~/assets/styles/main.scss" as *;',
        },
      },
    },
  },

  compatibilityDate: '2024-07-16',
})
