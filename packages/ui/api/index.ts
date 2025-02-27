import { request } from 'graphql-request'
import ecosystemsQuery from './queries/ecosystems'
import feedQuery from './queries/feed'
import feedsQuery from './queries/feeds'
import networksQuery from './queries/networks'
import feedRequestsQuery from './queries/requests'
import type { Ecosystem, Feed, FeedRequest, Network } from '~/types'

function getApiEndpoint() {
  return useRuntimeConfig().public.apiBase
}

export const getAllFeedsRequests = async ({
  network,
  mainnet,
  pair,
}: {
  network: string | null
  mainnet: boolean | null
  pair: string | null
}) =>
  (await request(
    getApiEndpoint(),
    feedsQuery,
    {
      network,
      mainnet,
      pair,
    },
    { accept: 'application/json' },
  )) as {
    feeds: FeedRequest[]
    total: number
  }

export const getEcosystems = async () => {
  const result: { feeds: unknown } = await request(
    getApiEndpoint(),
    ecosystemsQuery,
    {
      network: 'all',
    },
    { accept: 'application/json' },
  )
  return result.feeds as {
    feeds: Ecosystem[]
    total: number
  }
}

export const getNetworks = async () =>
  (await request(getApiEndpoint(), networksQuery)) as {
    networks: Network[]
  }

export const getFeedInfo = async ({
  timestamp,
  feedFullName,
}: {
  timestamp: number
  feedFullName: string
}) =>
  (await request(
    getApiEndpoint(),
    feedQuery,
    {
      timestamp,
      feedFullName,
    },
    { accept: 'application/json' },
  )) as { feed: Feed }

export const getFeedRequests = async ({
  feedFullName,
  page,
  size,
}: {
  feedFullName: string
  page: number
  size: number
}) => {
  const result = (await request(
    getApiEndpoint(),
    feedRequestsQuery,
    {
      feedFullName,
      page,
      size,
    },
    { accept: 'application/json' },
  )) as {
    requests: {
      requests: FeedRequest[]
      total: number
    }
  }
  return result.requests
}
