import Web3 from 'web3'
import { Repositories } from '../../types'
import { NetworkRouter } from './NetworkRouter'
import { Configuration } from './Configuration'

export class Web3Middleware {
  public repositories: Repositories
  private Web3: typeof Web3
  public networkRouters: Array<NetworkRouter> = []
  public configuration: Configuration

  constructor(
    configuration: Configuration,
    dependencies: { Web3: typeof Web3; repositories: Repositories },
  ) {
    this.repositories = dependencies.repositories
    this.Web3 = dependencies.Web3
    this.configuration = configuration

    this.networkRouters = this.configuration
      .listNetworksUsingPriceFeedsContract()
      .map(
        (networkInfo) =>
          new NetworkRouter(
            this.configuration,
            this.Web3,
            this.repositories,
            networkInfo,
          ),
      )
  }

  public async listen() {
    this.networkRouters.map((networkRouter) => networkRouter.listen())
  }

  public stop() {
    this.networkRouters.forEach((networkRouter) => networkRouter.stop())
  }
}
