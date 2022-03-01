import { dataFeedStatus } from '@/constants'

export function getDataFeedStatus(heartbeat, lastResultTimestamp) {
  const updateLimitTimestamp = new Date().getTime() - Number(heartbeat)
  const lastResultTimestampMilliseconds = Number(`${lastResultTimestamp}000`)
  if (updateLimitTimestamp > lastResultTimestampMilliseconds) {
    return dataFeedStatus.delay
  } else {
    return dataFeedStatus.operational
  }
}
