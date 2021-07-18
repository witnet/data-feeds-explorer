import { format } from 'date-fns'

export function formatTimestamp(timestamp) {
  const timestampLength = timestamp.toString().length
  const d = timestampLength < 13 ? timestamp + '000' : timestamp
  const currentDate = new Date(Number(d))
  const formatedTimestamp = format(currentDate, 'yyyy/MM/dd HH:mm:ss')
  return `${formatedTimestamp}`
}
