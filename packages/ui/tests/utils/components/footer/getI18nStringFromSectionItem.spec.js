import { getI18nStringFromSectionItem } from '../../../../components/footer/getI18nStringFromSectionItem'

describe('getI18nStringFromSectionItem.spec', () => {
  it('should return the i18n key', () => {
    const sectionName = 'ecosystem'
    const sectionItem = 'dataFeedsExplorer'

    const i18nKey = getI18nStringFromSectionItem(sectionName, sectionItem)

    expect(i18nKey).toBe('footer.links.ecosystem.data_feeds_explorer')
  })
})
