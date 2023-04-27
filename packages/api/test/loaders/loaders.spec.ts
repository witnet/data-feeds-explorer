import { LoadersFactory } from '../../src/loaders'

describe('loaders', () => {
  describe('lastResult', () => {
    it('lastResult loader should call getLastResult', async () => {
      const getLastResultMock = jest.fn(() => ({ feedFullName: 'name' }))
      const get = jest.fn(() => '<svg></svg>')
      const getMany = jest.fn(arr => arr.map(_ => '<svg></svg>'))
      const svgCache = jest.fn(() => ({ get, getMany }))
      const loaders = new LoadersFactory(
        {
          resultRequestRepository: {
            getLastResult: getLastResultMock
          }
        } as any,
        svgCache as any
      )

      await loaders.getLoaders().lastResult.load('feedName')

      expect(getLastResultMock).toHaveBeenCalledWith('feedName')
    })

    it('lastResult loader should call getLastResult the same amount of times than filters provided', async () => {
      const getLastResultMock = jest.fn(() => ({ feedFullName: 'name' }))
      const get = jest.fn(() => '<svg></svg>')
      const getMany = jest.fn(arr => arr.map(_ => '<svg></svg>'))
      const svgCache = jest.fn(() => ({ get, getMany }))
      const loaders = new LoadersFactory(
        {
          resultRequestRepository: {
            getLastResult: getLastResultMock
          }
        } as any,
        svgCache as any
      )

      await loaders.getLoaders().lastResult.load('feedName1')
      await loaders.getLoaders().lastResult.load('feedName2')

      expect(getLastResultMock).toHaveBeenNthCalledWith(1, 'feedName1')
      expect(getLastResultMock).toHaveBeenNthCalledWith(2, 'feedName2')
    })

    it('lastResult loader should return the result of calling getLastResult', async () => {
      const getLastResultMock = jest.fn(() => ({ feedFullName: 'name' }))
      const get = jest.fn(() => '<svg></svg>')
      const getMany = jest.fn(arr => arr.map(_ => '<svg></svg>'))
      const svgCache = jest.fn(() => ({ get, getMany }))
      const loaders = new LoadersFactory(
        {
          resultRequestRepository: {
            getLastResult: getLastResultMock
          }
        } as any,
        svgCache as any
      )

      const result = await loaders.getLoaders().lastResult.load('feedName')

      expect(result).toStrictEqual({ feedFullName: 'name' })
    })
  })

  describe('getRequests', () => {
    it('should call getFeedRequests', async () => {
      const getFeedRequestsMock = jest.fn(() => ({ feedFullName: 'name' }))
      const get = jest.fn(() => '<svg></svg>')
      const getMany = jest.fn(arr => arr.map(_ => '<svg></svg>'))
      const svgCache = jest.fn(() => ({ get, getMany }))
      const timestamp = Math.floor(Date.now() / 1000) - 10000
      const loaders = new LoadersFactory(
        {
          resultRequestRepository: {
            getFeedRequests: getFeedRequestsMock
          }
        } as any,
        svgCache as any
      )

      await loaders
        .getLoaders()
        .requests.load({ feedFullName: 'feedName', timestamp } as any)

      expect(getFeedRequestsMock).toHaveBeenCalledWith('feedName', timestamp)
    })

    it('should call getFeedRequests the same amount of times than filters provided', async () => {
      const getFeedRequestsMock = jest.fn(() => ({ feedFullName: 'name' }))
      const get = jest.fn(() => '<svg></svg>')
      const getMany = jest.fn(arr => arr.map(_ => '<svg></svg>'))
      const svgCache = jest.fn(() => ({ get, getMany }))
      const timestamp1 = Math.floor(Date.now() / 1000) - 10000
      const timestamp2 = Math.floor(Date.now() / 1000) - 20000
      const loaders = new LoadersFactory(
        {
          resultRequestRepository: {
            getFeedRequests: getFeedRequestsMock
          }
        } as any,
        svgCache as any
      )

      await loaders.getLoaders().requests.load({
        feedFullName: 'feedName1',
        timestamp: timestamp1
      } as any)
      await loaders.getLoaders().requests.load({
        feedFullName: 'feedName2',
        timestamp: timestamp2
      } as any)

      expect(getFeedRequestsMock).toHaveBeenNthCalledWith(
        1,
        'feedName1',
        timestamp1
      )
      expect(getFeedRequestsMock).toHaveBeenNthCalledWith(
        2,
        'feedName2',
        timestamp2
      )
    })

    it('should return the result of calling getFeedRequests', async () => {
      const getFeedRequestsMock = jest.fn(() => ({ feedFullName: 'name' }))
      const get = jest.fn(() => '<svg></svg>')
      const getMany = jest.fn(arr => arr.map(_ => '<svg></svg>'))
      const svgCache = jest.fn(() => ({ get, getMany }))
      const timestamp = Math.floor(Date.now() / 1000) - 10000
      const loaders = new LoadersFactory(
        {
          resultRequestRepository: {
            getFeedRequests: getFeedRequestsMock
          }
        } as any,
        svgCache as any
      )

      const result = await loaders
        .getLoaders()
        .requests.load({ feedFullName: 'feedName', timestamp } as any)

      expect(result).toStrictEqual({ feedFullName: 'name' })
    })
  })
})
