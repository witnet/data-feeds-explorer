import fs from 'fs'
import path from 'path'
import { normalizeConfig } from '../src/utils/index'

describe('validateDataFeedsConfig', () => {
  it('', async () => {
    const expected = JSON.parse(
      fs.readFileSync(
        path.resolve(process.env.DATA_FEED_CONFIG_PATH || './dataFeeds.json'),
        'utf-8'
      )
    )
    const dataFeedsRouterConfig = JSON.parse(
      fs.readFileSync(path.resolve('./src/dataFeedsRouter.json'), 'utf-8')
    )

    const feeds = normalizeConfig(dataFeedsRouterConfig)
    expect(feeds).toBe(expected)
  })
})
