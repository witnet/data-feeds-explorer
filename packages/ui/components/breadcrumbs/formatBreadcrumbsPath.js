import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

export function formatBreadcrumbsPath(name) {
  if (name) {
    const networks = name.split('_')[0].split('-')
    if (networks[1]) {
      return `${capitalizeFirstLetter(networks[0])} 
      ${capitalizeFirstLetter(networks[1])}`
    } else {
      return capitalizeFirstLetter(networks[0])
    }
  } else {
    return null
  }
}
