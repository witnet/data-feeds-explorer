export function containFalsyValues(obj: Object): boolean {
  return !Object.values(obj).reduce((prev, val) => prev && val)
}