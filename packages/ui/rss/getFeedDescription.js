import { formatMilliseconds } from '../utils/formatMilliseconds'

export function getFeedDescription(dataFeed) {
  const name = dataFeed.name.toUpperCase()
  const network = dataFeed.networkName
  const feedTimeToUpdate = dataFeed.heartbeat
    ? formatMilliseconds(
        Number(dataFeed.heartbeat) + Number(dataFeed.finality),
        ' and ',
        'en'
      )
    : null
  const deviation = dataFeed.deviation
  if (dataFeed.isRouted && feedTimeToUpdate) {
    return `This is a Witnet powered ${name} price feed available on ${network}. This price feed is updated every ${feedTimeToUpdate}, or every time any of the related price feeds update.`
  } else if (dataFeed.isRouted) {
    return `This is a Witnet powered ${name} price feed available on ${network}. This price feed is updated as soon as any of the related price feeds update.`
  } else {
    return `This is a Witnet powered ${name} price feed available on ${network}. This price feed is updated every ${feedTimeToUpdate}, or every time the price changes by more than ${deviation}%.`
  }
}
