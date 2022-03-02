/// calculate the time passed from a given date
import { es, enGB } from 'date-fns/locale'
import { formatDistanceToNowStrict } from 'date-fns'

export const LANGUAGES = {
  es: { name: 'Español', locale: 'es', fnsLocale: es },
  en: { name: 'English', locale: 'en', fnsLocale: enGB },
}

export function calculateTimeAgo(date, currentLocale) {
  const timestampLength = date.toString().length
  const d = timestampLength < 13 ? Number(date) + '000' : Number(date)
  const currentDate = new Date(Number(d))
  const formatedTime = formatDistanceToNowStrict(currentDate, {
    addSuffix: true,
    locale: LANGUAGES[currentLocale].fnsLocale,
  })
  return `${formatedTime}`
}
