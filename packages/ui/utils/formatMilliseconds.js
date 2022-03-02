import { intervalToDuration, formatDuration } from 'date-fns'

export function formatMilliseconds(milliseconds) {
  return formatDuration(intervalToDuration({ start: 0, end: milliseconds }), {
    format: ['days', 'hours', 'minutes', 'seconds'],
    delimiter: ' and ',
  })
}
