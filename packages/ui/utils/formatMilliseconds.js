import { intervalToDuration, formatDuration } from 'date-fns'
import { LANGUAGE_LOCALES } from '../constants'

export function formatMilliseconds(milliseconds, delimiter, currentLocale) {
  return formatDuration(intervalToDuration({ start: 0, end: milliseconds }), {
    format: ['days', 'hours', 'minutes', 'seconds'],
    delimiter,
    locale: LANGUAGE_LOCALES[currentLocale].fnsLocale,
  })
}
