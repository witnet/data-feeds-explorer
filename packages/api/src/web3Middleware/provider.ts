import { Network } from './../types'

export function getProvider (network: Network) {
  const providers: Record<Network, string> = {
    [Network.EthereumMainnet]: process.env.ETHEREUM_MAINNET_PROVIDER,
    [Network.EthereumGoerli]: process.env.ETHEREUM_GOERLI_PROVIDER,
    [Network.EthereumRinkeby]: process.env.ETHEREUM_RINKEBY_PROVIDER,
    [Network.ConfluxTestnet]: process.env.CONFLUX_TESTNET_PROVIDER,
    [Network.ConfluxTethys]: process.env.CONFLUX_TETHYS_PROVIDER,
    [Network.BobaRinkeby]: process.env.BOBA_RINKEBY_PROVIDER,
    [Network.BobaMainnet]: process.env.BOBA_MAINNET_PROVIDER,
    [Network.CeloAlfajores]: process.env.CELO_ALFAJORES_PROVIDER,
    [Network.CeloMainnet]: process.env.CELO_MAINNET_PROVIDER,
    [Network.MetisMainnet]: process.env.METIS_MAINNET_PROVIDER,
    [Network.MetisRinkeby]: process.env.METIS_RINKEBY_PROVIDER,
    [Network.HarmonyTestnet]: process.env.HARMONY_TESTNET_PROVIDER,
    [Network.KCCTestnet]: process.env.KCC_TESTNET_PROVIDER,
    [Network.KCCMainnet]: process.env.KCC_MAINNET_PROVIDER,
    [Network.MoonbeamMoonbase]: process.env.MOONBASE_ALPHA_PROVIDER,
    [Network.PolygonMainnet]: process.env.POLYGON_MAINNET_PROVIDER,
    [Network.PolygonGoerli]: process.env.POLYGON_GOERLI_PROVIDER,
    [Network.AvalancheFuji]: process.env.AVALANCHE_FUJI_PROVIDER
  }
  return providers[network]
}
