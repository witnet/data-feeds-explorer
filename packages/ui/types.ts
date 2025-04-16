export enum localeCodes {
  en = 'en-US',
  es = 'es-ES',
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
  language: string
  name: string
  file: string
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

export type FeedRequests = {
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
  requests: FeedRequests[]
  blockExplorer: string
  color: string
  logo: string
}

export interface DataStore {
  selectedEcosystem: Network[] | []
  selectedEcosystemName: String
  networks: Array<Network | undefined>
  ecosystems: Ecosystem[] | []
  totalFeeds: number
  feed: Feed | null
  paginatedFeedRequest: FeedRequests[] | null
}
