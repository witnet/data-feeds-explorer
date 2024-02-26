import SvgCache from '../src/svgCache'
import { fetchSvgs } from '../src/fetchSvgs'

jest.mock('../src/fetchSvgs')

jest.mock('../src/fetchSvgs', () => {
  const fetchSvgsMock = jest.fn((arr) =>
    arr.reduce((acc, val) => ({ ...acc, [val]: val }), {}),
  )
  return {
    fetchSvgs: fetchSvgsMock,
  }
})

describe('svgCache getMany', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks()
  })

  it('should call fetch with all the names received', async () => {
    const cache = new SvgCache()

    await cache.getMany(['btc', 'eth'])

    // should call fetchSvgs with all the names because there is no one cached
    expect(fetchSvgs).toHaveBeenNthCalledWith(1, ['btc', 'eth'])
  })

  it('should call fetch only with no cached names', async () => {
    const cache = new SvgCache()

    await cache.getMany(['btc', 'eth'])
    await cache.getMany(['btc', 'eth', 'wit'])

    expect(fetchSvgs).toHaveBeenNthCalledWith(1, ['btc', 'eth'])
    expect(fetchSvgs).toHaveBeenNthCalledWith(2, ['wit'])
  })
})
