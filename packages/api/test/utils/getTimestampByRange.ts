export function getTimestampByRange (range) {
  return Math.round(new Date().getTime() / 1000) - range * 3600 - 24 * 3600
}
