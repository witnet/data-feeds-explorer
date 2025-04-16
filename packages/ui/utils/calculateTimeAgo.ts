import { formatDistanceToNowStrict } from 'date-fns'
import { getFnsLocale } from './getFnsLocale'
import type { localeCodes } from '~/types'

export function calculateTimeAgo(
  date: string,
  currentLocale: localeCodes,
): string {
  const timestampLength = date.length
  const d = timestampLength < 13 ? Number(date) + '000' : Number(date)
  const currentDate = new Date(Number(d))
  const formatedTime = formatDistanceToNowStrict(currentDate, {
    addSuffix: true,
    locale: getFnsLocale(currentLocale),
  })
  return `${formatedTime}`
}
