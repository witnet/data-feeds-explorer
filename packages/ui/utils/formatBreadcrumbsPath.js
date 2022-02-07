import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
export function formatBreadcrumbsPath(name) {
  if (name) {
    const networks = name.split('_')[0].split('-')
    return `${capitalizeFirstLetter(networks[0])} 
    ${capitalizeFirstLetter(networks[1])}`
  } else {
    return null
  }
}
