import { dataFeedStatus } from '@/constants'

export function getDataFeedStatus(heartbeat, lastResultTimestamp) {
  if (heartbeat) {
    const updateLimitTimestamp = new Date().getTime() - Number(heartbeat)
    const lastResultTimestampMilliseconds = Number(`${lastResultTimestamp}000`)
    if (updateLimitTimestamp > lastResultTimestampMilliseconds) {
      return dataFeedStatus.delay
    }
  }
  return dataFeedStatus.operational
}
