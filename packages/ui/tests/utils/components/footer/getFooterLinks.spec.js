import getFooterLinks from '../../../../components/footer/getFooterLinks'
import { footerSections } from '../../../../constants'

describe('getFooterLinks', () => {
  // Check that getFooterLinks returns Array<{title: SectionName, links: Array<{url: string, text: I18nKey}>}> where SectionName and I18nKey are strings

  it('should return an array of objects and every object have the section name as under the key title', () => {
    const footerLinks = getFooterLinks(footerSections)

    footerLinks.forEach((footerLink, index) => {
      expect(footerLink.title).toBe(Object.keys(footerSections)[index])
    })
  })

  it('should create an array of objects that have the section links as an object with the url and i18n key', () => {
    const footerLinks = getFooterLinks(footerSections)

    footerLinks.forEach((footerLink, index) => {
      footerLink.links.forEach((link) => {
        expect(link.url).toBeTruthy()
        expect(link.text).toBeTruthy()
      })
    })
  })
})
