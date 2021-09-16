import { Network } from './../types'

export function getProvider (network: Network) {
  const providers: Record<Network, string> = {
    [Network.EthereumMainnet]: process.env.ETHEREUM_MAINNET_PROVIDER,
    [Network.EthereumGoerli]: process.env.ETHEREUM_GOERLI_PROVIDER,
    [Network.EthereumKovan]: process.env.ETHEREUM_KOVAN_PROVIDER,
    [Network.EthereumRinkeby]: process.env.ETHEREUM_RINKEBY_PROVIDER,
    [Network.ConfluxTestnet]: process.env.CONFLUX_TESTNET_PROVIDER,
    [Network.ConfluxMainnet]: process.env.CONFLUX_MAINNET_PROVIDER,
    [Network.BobaRinkeby]: process.env.BOBA_RINKEBY_PROVIDER
  }
  return providers[network]
}
