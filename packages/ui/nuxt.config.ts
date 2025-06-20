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
          name: 'title',
          content: 'Data Feeds Explorer | Witnet',
        },
        {
          name: 'description',
          content:
            'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
        },
        {
          name: 'twitter:title',
          content: 'Data Feeds Explorer | Witnet',
        },
        {
          name: 'twitter:description',
          content:
            'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
        },
        {
          name: 'twitter:image',
          content: 'https://feeds.witnet.io/meta-image.png',
        },
        {
          name: 'twitter:image:alt',
          content: 'Witnet data feeds explorer',
        },
        {
          property: 'og:title',
          content: 'Data Feeds Explorer | Witnet',
        },
        {
          property: 'og:description',
          content:
            'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
        },
        {
          property: 'og:image',
          content: 'https://feeds.witnet.io/meta-image.png',
        },
        {
          property: 'og:image:secure_url',
          content: 'https://feeds.witnet.io/meta-image.png',
        },
        {
          property: 'og:image:alt',
          content: 'Witnet data feeds explorer',
        },
      ],
      link: [
        {
          rel: 'preload stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
          as: 'style',
          type: 'text/css',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'shortcut icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    },
  },
  devtools: { enabled: true },
  components: [{ path: '~/components', pathPrefix: false }],
  compatibilityDate: '2025-02-27',
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
    'nuxt-gtag',
    'nuxt-module-eslint-config',
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
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    locales: Object.values(LANGUAGE_LOCALES),
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_ENDPOINT,
    },
  },

  css: [
    '~/assets/styles/tailwind.css',
    'wit-vue-ui/style.css',
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
          additionalData: '@use "~/assets/styles/main.scss" as *;',
          api: 'modern-compiler',
        },
      },
    },
  },
})
