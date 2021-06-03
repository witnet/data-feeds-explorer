/// calculate the time passed from a given date
import { es, enGB } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

export const LANGUAGES = {
  es: { name: 'Español', locale: 'es', fnsLocale: es },
  en: { name: 'English', locale: 'en', fnsLocale: enGB },
}

export function calculateTimeAgo(date, currentLocale) {
  const timestampLength = date.toString().length
  const d = timestampLength < 13 ? date + '000' : date
  const currentDate = new Date(Number(d))
  const formatedTime = formatDistanceToNow(currentDate, {
    addSuffix: false,
    locale: LANGUAGES[currentLocale].fnsLocale,
  })
  return `${formatedTime}`
}
