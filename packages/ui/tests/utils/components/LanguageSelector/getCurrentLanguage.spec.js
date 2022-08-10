import { getCurrentLanguage } from '../../../../utils/getCurrentLanguage'

describe('getCurrentLanguage', () => {
  it('should return the correct language', () => {
    const url = '/es/meter/meter-mainnet_mtr-usdt_6'

    const expectedLanguage = {
      code: 'es',
      iso: 'es-ES',
      label: 'Español',
      name: 'Español',
    }
    expect(getCurrentLanguage(url)).toStrictEqual(expectedLanguage)
  })
  it('should return the correct language', () => {
    const url = '/meter/meter-mainnet_mtr-usdt_6'
    const expectedLanguage = {
      code: 'en',
      isCatchallLocale: true,
      iso: 'en-US',
      label: 'English',
      name: 'English',
    }
    expect(getCurrentLanguage(url)).toStrictEqual(expectedLanguage)
  })
})
