import { request } from 'graphql-request'
import ecosystemsQuery from './queries/ecosystems'
import feedQuery from './queries/feed'
import feedsQuery from './queries/feeds'
import networksQuery from './queries/networks'
import feedRequestsQuery from './queries/requests'
import type { Ecosystem, Feed, FeedRequests, Network } from '~/types'

// TODO: Find a better way to pass the API_ENDPOINT and be able to use the same nuxt build
// for staging and production environments
function getApiEndpoint () {
  const url = window.location.href 
  if (url.includes('staging')) {
    return 'https://staging-feeds-api.witnet.io/'
  } else if (url.includes('localhost')) {
    return useRuntimeConfig().public.apiBase
  } else {
    return 'https://feeds-api.witnet.io/'
  }
}

export const getAllFeedsRequests = async ({ network }: { network: string }) =>
  (await request(
    getApiEndpoint(),
    feedsQuery,
    {
      network,
    },
    { accept: 'application/json' },
  )) as {
    feeds: FeedRequests[]
    total: number
  }

export const getEcosystems = async () => {
  const result: { feeds: any } = await request(
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
}) =>
  (await request(
    getApiEndpoint(),
    feedRequestsQuery,
    {
      feedFullName,
      page,
      size,
    },
    { accept: 'application/json' },
  )) as {
    requests: FeedRequests[]
  }
