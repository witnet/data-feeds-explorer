export function generateSelectOptions(list) {
  if (!list) return []

  return list.reduce((options, item) => {
    if (includesItem(options, item)) {
      return options
    } else {
      return [
        ...options,
        {
          label: item,
          key: item.split('-').map(capitalizeFirstLetter).join(' '),
        },
      ]
    }
  }, [])
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function includesItem(options, item) {
  return options.find((option) => option.label === item)
}
