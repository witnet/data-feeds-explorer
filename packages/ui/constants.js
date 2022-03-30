import { es, enGB } from 'date-fns/locale'

export const urls = {
  youtube: 'https://www.youtube.com/channel/UCCS143kLVAH7oHZKvNNNxKQ',
  documentation: 'https://docs.witnet.io/',
  ado: 'https://github.com/adoracles/',
  fullNode: 'https://docs.witnet.io/try/run-a-node/',
  tokenomics:
    'https://medium.com/witnet/wit-witnet-blockchains-native-tokenomics-4559084073c5',
  wallet: 'https://sheikah.app/',
  // truffleBox: 'https://docs.witnet.io/try/use-from-ethereum/',
  blockExplorer: 'https://witnet.network/',
  twitter: 'https://twitter.com/witnet_io',
  telegram: 'https://t.me/witnetio',
  discord: 'https://discord.gg/X4uurfP',
  reddit: 'https://reddit.com/r/witnet',
  github: 'https://github.com/witnet',
  medium: 'https://medium.com/witnet',
  whitepaper: 'https://witnet.io/witnet-whitepaper.pdf',
  dataFeedsExplorer: 'https://feeds.witnet.io',
  gate: 'https://www.gate.io/trade/WIT_USDT',
  grantProgram:
    'https://ripple-snarl-211.notion.site/About-the-Witnet-Grant-Program-WGP-c037b8fbeae143b0a15ea5ab60d3f24c',
  token: 'https://witnet.io/#token',
  oracle: 'https://witnet.io/#oracle',
  ecosystem: 'https://witnet.io/#ecosystem',
  community: 'https://witnet.io/#community',
  priceFeeds: 'https://docs.witnet.io/smart-contracts/witnet-data-feeds',
  randomness: 'https://docs.witnet.io/smart-contracts/witnet-randomness-oracle',
  getPostRequest:
    'https://docs.witnet.io/smart-contracts/apis-and-http-get-post-oracle',
}

export const witnetBlockExplorerUrl = 'https://witnet.network/search'
export const requestDataFeedUrl = 'https://tally.so/r/wMZDAn'
export const witnetUrl = 'https://witnet.io'
export const integrateDirectlyBaseUrl =
  'https://docs.witnet.io/smart-contracts/witnet-data-feeds/using-witnet-data-feeds#reading-last-price-and-timestamp-from-a-price-feed-contract-serving-a-specific-pair'
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

export const footerSections = {
  witnet: ['oracle', 'ecosystem', 'community', 'whitepaper'],
  ecosystem: ['fullNode', 'wallet', 'dataFeedsExplorer'],
  developers: ['documentation', 'priceFeeds', 'randomness', 'getPostRequest'],
  community: ['telegram', 'discord', 'twitter', 'reddit', 'youtube'],
}
