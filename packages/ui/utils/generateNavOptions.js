export function generateNavOptions(list) {
  return list
    .map((network) => network[0].chain)
    .sort((a, b) => (b < a ? 1 : -1))
}
