export function containFalsyValues(obj: object): boolean {
  return !Object.values(obj).reduce((prev, val) => prev && val)
}
