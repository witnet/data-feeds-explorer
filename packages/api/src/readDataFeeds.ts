import axios from 'axios'
import { RouterDataFeedsConfig } from '../types'

const CONFIG_URL = process.env.TEST_BRANCH
  ? `https://raw.github.com/witnet/data-feeds-explorer/${process.env.TEST_BRANCH}/packages/api/src/dataFeedsRouter.json`
  : `https://raw.github.com/witnet/data-feeds-explorer/main/packages/api/src/dataFeedsRouter.json`

function isRouterDataFeedsConfig(val: any): val is RouterDataFeedsConfig {
  return val?.contracts && val?.chains && val.conditions && val.currencies
}

export async function fetchDataFeedsRouterConfig(): Promise<RouterDataFeedsConfig | null> {
  console.log('Reading configuration file from:', CONFIG_URL)
  return await axios
    .get(CONFIG_URL)
    .then((res) => {
      if (isRouterDataFeedsConfig(res.data)) {
        return res.data
      } else {
        throw new Error('Received data is not of type RouterDataFeedsConfig')
      }
    })
    .catch((err) => {
      console.error(
        `There was an error fetching the config file from ${CONFIG_URL}`,
        err,
      )

      return null
    })
}
