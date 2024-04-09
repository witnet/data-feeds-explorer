import { request } from 'graphql-request'
import ecosystemsQuery from './queries/ecosystems'
import feedQuery from './queries/feed'
import feedsQuery from './queries/feeds'
import networksQuery from './queries/networks'
import feedRequestsQuery from './queries/requests'
import type { Ecosystem, Feed, FeedRequests, Network } from '~/types'

export const getAllFeedsRequests = async ({ network }: { network: string }) =>
  (await request(
    useRuntimeConfig().public.apiBase,
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
    useRuntimeConfig().public.apiBase,
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
  (await request(useRuntimeConfig().public.apiBase, networksQuery)) as {
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
    useRuntimeConfig().public.apiBase,
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
    useRuntimeConfig().public.apiBase,
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
