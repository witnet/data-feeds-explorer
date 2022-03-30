import { urls } from '../../constants'
import { getI18nStringFromSectionItem } from './getI18nStringFromSectionItem'

export function getFooterLinks(sections) {
  return Object.entries(sections).map(([sectionName, sectionItems]) => ({
    title: sectionName,
    links: sectionItems.map((sectionItem) => ({
      url: urls[sectionItem],
      text: getI18nStringFromSectionItem(sectionName, sectionItem),
    })),
  }))
}
