import { Network } from './../types'

export function getProvider (network: Network) {
  const providers: Record<Network, string> = {
    [Network.Mainnet]: process.env.MAINNET_PROVIDER,
    [Network.Goerli]: process.env.GOERLI_PROVIDER,
    [Network.Kovan]: process.env.KOVAN_PROVIDER,
    [Network.Rinkeby]: process.env.RINKEBY_PROVIDER,
    [Network.Conflux]: process.env.CONFLUX_PROVIDER
  }

  return providers[network]
}
