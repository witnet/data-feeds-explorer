import snakeCase from 'lodash.snakecase'

export function getI18nStringFromSectionItem(sectionName, sectionItem) {
  return `footer.links.${sectionName}.${snakeCase(sectionItem)}`
}

export default getI18nStringFromSectionItem
