import { formatNumber } from './formatNumber'
import { getWitnetBlockExplorerLink } from './getWitnetBlockExplorerLink'

export function getAdaptedFeed(feed) {
  if (!feed) {
    return null
  }

  return {
    name: feed.name.toUpperCase(),
    isRouted: feed.isRouted,
    address: feed.address,
    proxyAddress: feed.proxyAddress,
    contractId: feed.contractId,
    finality: Number(feed.finality),
    deviation: feed.deviation,
    heartbeat: Number(feed.heartbeat),
    decimals: feed.feedFullName.split('_').pop() || 3,
    chain: feed.chain,
    lastResultValue: feed.lastResult,
    lastResultTimestamp: feed.lastResultTimestamp || '',
    networkName: feed.networkName,
    label: feed.label,
    network: feed.network,
    urlUnderlyingContract: feed.blockExplorer.replace(
      `{address}`,
      feed.address
    ),
    urlProxyContract: feed.blockExplorer.replace(
      `{address}`,
      feed.proxyAddress
    ),
    logo: feed.logo,
  }
}

export function getTransactions(feed, requests) {
  if (!feed || !requests?.length) {
    return null
  }

  return requests.map((request) => ({
    witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
    drTxHash: request.drTxHash,
    data: {
      label: feed.label,
      value: request.result,
      decimals: feed.decimals,
    },
    timestamp: request.timestamp,
  }))
}

export function getLastResultValue(feed) {
  if (!feed) {
    return null
  }
  const dataFeedLastValue = `${feed.label}${formatNumber(
    parseFloat(feed.lastResultValue) / 10 ** feed.decimals
  )} `
  return dataFeedLastValue
}

export function getMaxTimeToResolve(feed) {
  if (!feed || !feed.heartbeat) {
    return null
  }

  return feed.heartbeat + feed.finality
}

export function getChartData(requests, normalizedFeed) {
  if (!requests?.length) {
    return [{ time: 0, value: 0 }]
  }

  return requests
    .map((request) => {
      return {
        time: Number(request.timestamp),
        value: parseFloat(request.result) / 10 ** normalizedFeed.decimals,
      }
    })
    .sort((t1, t2) => t1.time - t2.time)
}
