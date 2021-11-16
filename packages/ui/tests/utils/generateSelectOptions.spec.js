import { generateSelectOptions } from '../../utils/generateSelectOptions'

describe('generateSelectOptions.js', () => {
  it('should generate a list of options from a list of feeds', () => {
    const networks = [
      { label: 'ethereum-rinkeby' },
      { label: 'ethereum-goerli' },
      { label: 'conflux-testnet' },
      { label: 'boba-rinkeby' },
    ]

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual([
      { label: 'ethereum-rinkeby', key: 'Ethereum Rinkeby' },
      { label: 'ethereum-goerli', key: 'Ethereum Goerli' },
      { label: 'conflux-testnet', key: 'Conflux Testnet' },
      { label: 'boba-rinkeby', key: 'Boba Rinkeby' },
    ])
  })

  it('should generate an empty list if the arguments are empty', () => {
    const networks = []

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual([])
  })

  it('should generate empty list if no argument is provided', () => {
    const networks = []

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual([])
  })
})
