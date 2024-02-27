import { Network } from '../../types'

export function getProvider(network: Network) {
  // The provider env variable name should be the network name specified in the config plus '_PROVIDER' ex.MOONBEAM_MOONBASE_PROVIDER
  return process.env[`${network.toUpperCase().split('-').join('_')}_PROVIDER`]
}
