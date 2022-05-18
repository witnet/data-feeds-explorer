import { fetchSvgs } from '../src/fetchSvgs'

jest.mock('axios')

jest.mock('axios', () => {
  const getMock = jest.fn(url => {
    const svgName = url
      .split('/')
      .reverse()[0]
      .split('.')[0]
    return {
      data: `<svg>${svgName}</svg>`
    }
  })

  return {
    get: getMock
  }
})

describe('svgCache getMany', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks()
  })

  it('should fetch the list of svgs received', async () => {
    const svgs = await fetchSvgs(['btc', 'eth'])

    expect(svgs).toStrictEqual({ btc: '<svg>btc</svg>', eth: '<svg>eth</svg>' })
  })

  it('should fetch the same svg only once', async () => {
    const svgs = await fetchSvgs(['btc', 'eth', 'btc'])

    expect(svgs).toStrictEqual({ btc: '<svg>btc</svg>', eth: '<svg>eth</svg>' })
  })
})
