import { describe, it, expect } from 'vitest'
import { generateSelectOptions } from '../../utils/generateSelectOptions'

describe('generateSelectOptions.js', () => {
  it('should generate a list of options from a list of feeds', () => {
    const networks = [
      { label: 'ethereum-rinkeby', key: 'Ethereum Rinkeby', chain: 'Ethereum' },
      { label: 'ethereum-goerli', key: 'Ethereum Goerly', chain: 'Ethereum' },
      { label: 'conflux-testnet', key: 'Conflux Testnet', chain: 'Conflux' },
      { label: 'boba-rinkeby', key: 'Boba Rinkeby', chain: 'Boba' },
    ]

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual({
      boba: [{ key: 'Boba Rinkeby', label: 'boba-rinkeby', chain: 'Boba' }],
      conflux: [
        {
          key: 'Conflux Testnet',
          label: 'conflux-testnet',
          chain: 'Conflux',
        },
      ],
      ethereum: [
        {
          label: 'ethereum-rinkeby',
          key: 'Ethereum Rinkeby',
          chain: 'Ethereum',
        },
        {
          label: 'ethereum-goerli',
          key: 'Ethereum Goerly',
          chain: 'Ethereum',
        },
      ],
    })
  })

  it('should generate an empty list if the arguments are empty', () => {
    const networks = []

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual({})
  })

  it('should generate empty list if no argument is provided', () => {
    const networks = []

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual({})
  })
})
