export function generateSelectOptions(list) {
  if (!list) return []
  return list.reduce((acc, item, arr) => {
    if (acc[item.label.split('-')[0]]) {
      acc[item.label.split('-')[0]].push({
        label: item.label,
        key: item.label.split('-').map(capitalizeFirstLetter).join(' '),
        network: capitalizeFirstLetter(item.label.split('-')[0]),
      })
    } else {
      acc[item.label.split('-')[0]] = [
        {
          label: item.label,
          key: item.label.split('-').map(capitalizeFirstLetter).join(' '),
          network: capitalizeFirstLetter(item.label.split('-')[0]),
        },
      ]
    }
    return acc
  }, {})
}

export function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  } else {
    return 'null'
  }
}
