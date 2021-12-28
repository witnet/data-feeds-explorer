import fs from 'fs'
import path from 'path'
import { normalizeConfig } from '../src/utils/index'

describe('validateDataFeedsConfig', () => {
  it('check if the structure is correct', async () => {
    const dataFeedsRouterConfig = JSON.parse(
      fs.readFileSync(path.resolve('./src/dataFeedsRouter.json'), 'utf-8')
    )

    const feeds = normalizeConfig(dataFeedsRouterConfig)
    expect(feeds).toBe(feeds)
  })
})
