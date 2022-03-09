import { Loaders } from '../../src/loaders'

describe('loaders', () => {
  describe('lastResult', () => {
    it('lastResult loader should call getLastResult', async () => {
      const getLastResultMock = jest.fn(() => ({ feedFullName: 'name' }))
      const loaders = new Loaders({
        resultRequestRepository: {
          getLastResult: getLastResultMock
        }
      } as any)

      await loaders.getLoaders().lastResult.load('feedName')

      expect(getLastResultMock).toHaveBeenCalledWith('feedName')
    })

    it('lastResult loader should call getLastResult the same amount of times than filters provided', async () => {
      const getLastResultMock = jest.fn(() => ({ feedFullName: 'name' }))
      const loaders = new Loaders({
        resultRequestRepository: {
          getLastResult: getLastResultMock
        }
      } as any)

      await loaders.getLoaders().lastResult.load('feedName1')
      await loaders.getLoaders().lastResult.load('feedName2')

      expect(getLastResultMock).toHaveBeenNthCalledWith(1, 'feedName1')
      expect(getLastResultMock).toHaveBeenNthCalledWith(2, 'feedName2')
    })

    it('lastResult loader should return the result of calling getLastResult', async () => {
      const getLastResultMock = jest.fn(() => ({ feedFullName: 'name' }))
      const loaders = new Loaders({
        resultRequestRepository: {
          getLastResult: getLastResultMock
        }
      } as any)

      const result = await loaders.getLoaders().lastResult.load('feedName')

      expect(result).toStrictEqual({ feedFullName: 'name' })
    })
  })

  describe('getRequests', () => {
    it('should call getFeedRequests', async () => {
      const getFeedRequestsMock = jest.fn(() => ({ feedFullName: 'name' }))
      const loaders = new Loaders({
        resultRequestRepository: {
          getFeedRequests: getFeedRequestsMock
        }
      } as any)

      await loaders
        .getLoaders()
        .requests.load({ feedFullName: 'feedName', timestamp: 1 } as any)

      expect(getFeedRequestsMock).toHaveBeenCalledWith('feedName', 1)
    })

    it('should call getFeedRequests the same amount of times than filters provided', async () => {
      const getFeedRequestsMock = jest.fn(() => ({ feedFullName: 'name' }))
      const loaders = new Loaders({
        resultRequestRepository: {
          getFeedRequests: getFeedRequestsMock
        }
      } as any)

      await loaders
        .getLoaders()
        .requests.load({ feedFullName: 'feedName1', timestamp: 1 } as any)
      await loaders
        .getLoaders()
        .requests.load({ feedFullName: 'feedName2', timestamp: 2 } as any)

      expect(getFeedRequestsMock).toHaveBeenNthCalledWith(1, 'feedName1', 1)
      expect(getFeedRequestsMock).toHaveBeenNthCalledWith(2, 'feedName2', 2)
    })

    it('should return the result of calling getFeedRequests', async () => {
      const getFeedRequestsMock = jest.fn(() => ({ feedFullName: 'name' }))
      const loaders = new Loaders({
        resultRequestRepository: {
          getFeedRequests: getFeedRequestsMock
        }
      } as any)

      const result = await loaders.getLoaders().requests.load('feedName')

      expect(result).toStrictEqual({ feedFullName: 'name' })
    })
  })
})
