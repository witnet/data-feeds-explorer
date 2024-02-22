import { request } from 'graphql-request'
import ecosystemsQuery from './queries/ecosystems'
import feedQuery from './queries/feed'
import feedsQuery from './queries/feeds'
import networksQuery from './queries/networks'
import feedRequestsQuery from './queries/requests'

export const getAllFeedsRequests = async ({ network }: { network: any }) =>
  (await request(useRuntimeConfig().public.apiBase, feedsQuery, {
    network,
  })) as {
    feeds: any
    total: number
  }

export const getEcosystems = async () =>
  (await request(useRuntimeConfig().public.apiBase, ecosystemsQuery, {
    network: 'all',
  })) as {
    feeds: any
    total: number
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
  (await request(useRuntimeConfig().public.apiBase, feedQuery, {
    timestamp,
    feedFullName,
  })) as { feed: any }

export const getFeedRequests = async ({
  feedFullName,
  page,
  size,
}: {
  feedFullName: string
  page: number
  size: number
}) =>
  (await request(useRuntimeConfig().public.apiBase, feedRequestsQuery, {
    feedFullName,
    page,
    size,
  })) as {
    requests: any
  }
