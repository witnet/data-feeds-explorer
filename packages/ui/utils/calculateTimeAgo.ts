import { formatDistanceToNowStrict } from 'date-fns'

export function calculateTimeAgo(date: string): string {
  const timestampLength = date.length
  const d = timestampLength < 13 ? Number(date) + '000' : Number(date)
  const currentDate = new Date(Number(d))
  const formatedTime = formatDistanceToNowStrict(currentDate, {
    addSuffix: true,
  })
  return `${formatedTime}`
}
