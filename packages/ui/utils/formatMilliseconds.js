import { intervalToDuration, formatDuration } from 'date-fns'
import { getFnsLocale } from './getFnsLocale'

export function formatMilliseconds(milliseconds, delimiter, currentLocale) {
  return formatDuration(intervalToDuration({ start: 0, end: milliseconds }), {
    format: ['days', 'hours', 'minutes', 'seconds'],
    delimiter,
    locale: getFnsLocale(currentLocale),
  })
}
