import { es, enGB } from 'date-fns/locale'

export const witnetBlockExplorerUrl = 'https://witnet.network/search'
export const requestDataFeedUrl = 'https://witnet.io'
export const documentationUrl = 'https://docs.witnet.io/'
export const witnetUrl = 'https://witnet.io'
export const integrateDirectlyBaseUrl =
  'https://docs.witnet.io/smart-contracts/witnet-data-feeds/using-witnet-data-feeds#reading-last-price-and-timestamp-from-a-price-feed-contract-serving-a-given-currency-pair'
export const integrateThroughProxyBaseUrl =
  'https://docs.witnet.io/smart-contracts/witnet-data-feeds/using-witnet-data-feeds#reading-multiple-currency-pairs-from-the-router'

export const languages = [
  {
    code: 'en',
    iso: 'en-US',
    isCatchallLocale: true,
  },
  {
    code: 'es',
    iso: 'es-ES',
  },
]

export const LOCALE_LANGUAGES = {
  es: { name: 'Español', locale: 'es', fnsLocale: es },
  en: { name: 'English', locale: 'en', fnsLocale: enGB },
}

export const dataFeedStatus = {
  operational: {
    key: 'operational',
    color: '#4AB6A1',
  },
  error: {
    key: 'error',
    color: '#DF4B4B',
  },
  delay: {
    key: 'delay',
    color: '#DFC44B',
  },
}

export const CHART_RANGE = {
  w: {
    key: 'w',
    value: 24 * 7,
  },
  m: {
    key: 'm',
    value: 24 * 30,
  },
}
