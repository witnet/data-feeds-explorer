export function generateSelectOptions(list) {
  if (!list) return []

  return list.map((network) => ({
    label: network.label,
    key: network.label.split('-').map(capitalizeFirstLetter).join(' '),
  }))
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
