import { Network } from './../types'

export function getProvider (network: Network) {
  const providers: Record<Network, string> = {
    [Network.Goerli]: process.env.GOERLI_PROVIDER,
    [Network.Kovan]: process.env.KOVAN_PROVIDER,
    [Network.Rinkeby]: process.env.RINKEBY_PROVIDER
  }

  return providers[network]
}
