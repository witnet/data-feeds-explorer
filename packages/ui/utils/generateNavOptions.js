export function generateNavOptions(list) {
  return list.map((network) => network[0].chain)
}
