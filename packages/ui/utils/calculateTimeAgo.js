/// calculate the time passed from a given date
import { formatDistanceToNowStrict } from 'date-fns'
import { LOCALE_LANGUAGES } from '../constants'

export function calculateTimeAgo(date, currentLocale) {
  const timestampLength = date.toString().length
  const d = timestampLength < 13 ? Number(date) + '000' : Number(date)
  const currentDate = new Date(Number(d))
  const formatedTime = formatDistanceToNowStrict(currentDate, {
    addSuffix: true,
    locale: LOCALE_LANGUAGES[currentLocale].fnsLocale,
  })
  return `${formatedTime}`
}
