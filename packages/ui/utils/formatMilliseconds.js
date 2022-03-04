import { intervalToDuration, formatDuration } from 'date-fns'
import { LOCALE_LANGUAGES } from '../constants'

export function formatMilliseconds(milliseconds, delimiter, currentLocale) {
  return formatDuration(intervalToDuration({ start: 0, end: milliseconds }), {
    format: ['days', 'hours', 'minutes', 'seconds'],
    delimiter,
    locale: LOCALE_LANGUAGES[currentLocale].fnsLocale,
  })
}
