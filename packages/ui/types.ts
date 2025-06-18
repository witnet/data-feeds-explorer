export enum localeCodes {
  en = 'en',
  es = 'es',
}

export enum ThemeKey {
  light = 'light',
  dark = 'dark',
}

export interface Themes {
  [ThemeKey.dark]: {
    icon: string
    key: string
  }
  [ThemeKey.light]: {
    icon: string
    key: string
  }
}

export type Locale = {
  code: string
  iso: string
  name: string
  file: string
  fnsLocale: unknown
}

export interface LanguageDictionary {
  [localeCodes.en]: Locale
  [localeCodes.es]: Locale
}
export type CallbackFn = () => Promise<void>

export type ChartRange = {
  key: string
  value: number
}

export type Network = {
  chain: string
  key: string
  label: string
  logo: string
}

export type Ecosystem = {
  feeds: {
    chain: string
  }
  total: number
}

export type FeedRequest = {
  feedFullName: string
  result: string
  drTxHash: string
  timestamp: string
}

export type Feed = {
  feedFullName: string
  isRouted: boolean
  name: string
  address: string
  contractId: string
  lastResult: string
  lastResultTimestamp: string
  network: string
  networkName: string
  chain: string
  label: string
  deviation: string
  proxyAddress: string
  heartbeat: string
  finality: string
  sources: string[]
  requests: FeedRequest[]
  blockExplorer: string
  color: string
  logo: string
}

export interface DataStore {
  //FIXME: delete selectedEcosystem??
  loadingFeeds: boolean
  navBarSelection: Network[] | []
  selectedEcosystemName: string
  selectedPair: string | null
  ecosystems: Ecosystem[] | []
  selectedEcosystem: Network[] | []
  mainnetSelectedEcosystem: Network[] | []
  networks: Array<Network>
  feeds: FeedInfo[]
  mainnetFeeds: FeedInfo[]
  testnetFeeds: FeedInfo[]
  totalFeeds: number
  totalMainnetFeeds: number
  totalTestnetFeeds: number
  feed: Feed | null
  includeTestnets: boolean
  paginatedFeedRequest: {
    requests: FeedRequest[]
    total: number
  } | null
}

export type FeedInfo = {
  feedFullName: string
  name: string
  address: string
  lastResult: string
  lastResultTimestamp: string
  network: string
  label: string
  chain: string
  blockExplorer: string
  color: string
  heartbeat: string
  finality: string
  logo: string
  sources: string[]
}

export type FormatedFeedInfo = {
  detailsPath: {
    name: string
    params: {
      pair: string
    }
  }
  decimals: number
  name: string
  value: string
  lastResultTimestamp: string
  label: string
  timeToUpdate?: number
  img: {
    name: string
    alt: string
  }
  chain: string
  network: string
  color: string
  blockExplorer: string
  svg: string
  sources: string[]
}

export type GeneralFeedInfo = {
  availableNetworks: string[]
}

export type Source = {
  name: string
  url: string
}

export type FeedsRequestInfo = {
  feeds: {
    feeds: FeedInfo[]
    total: number
  }
}

export type NetworkOption = {
  name: string
  logo: string
}
