import { FeedInfo, Network, AbiItem } from '../../src/types'
import BtcUsdAbi from './abi/BtcUsd.json'
import EthUsdAbi from './abi/EthUsd.json'
import WitnetRequestBoardProxy from './abi/WitnetRequestBoardProxy.json'

export const dataFeeds: Array<FeedInfo> = [
  // Mainnet (id. 1) - v0.2.0:
  // * WitnetRequestBoardProxy: [0x400DbF3645b345823124aaB22D04013A46D9ceD5](https://etherscan.io/address/0x400DbF3645b345823124aaB22D04013A46D9ceD5)
  // * BtcUsdPriceFeed: [0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9](https://etherscan.io/address/0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9)
  // * EthUsdPriceFeed: [0x1ebD93231a7fE551E1d6405404Df34909eff4c2C](https://etherscan.io/address/0x1ebD93231a7fE551E1d6405404Df34909eff4c2C)
  {
    abi: BtcUsdAbi as Array<AbiItem>,
    address: '0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9',
    network: Network.Mainnet,
    name: 'btc/usd',
    label: '$',
    pollingPeriod: 10000,
    witnetRequestBoard: {
      address: '0x400DbF3645b345823124aaB22D04013A46D9ceD5',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    }
  },
  {
    abi: EthUsdAbi as Array<AbiItem>,
    address: '0x1ebD93231a7fE551E1d6405404Df34909eff4c2C',
    network: Network.Mainnet,
    name: 'eth/usd',
    label: '$',
    pollingPeriod: 10000,
    witnetRequestBoard: {
      address: '0x400DbF3645b345823124aaB22D04013A46D9ceD5',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    }
  },
  // Rinkeby (id. 4) - v0.2.0:
  // * BtcUsdPriceFeed: [0x58995FaD03158fB9cd64397347bA97714EF8fC12](https://rinkeby.etherscan.io/address/0x58995FaD03158fB9cd64397347bA97714EF8fC12)
  // * EthUsdPriceFeed: [0xAe9821fbA4Bd76fd6D39859bd7c3d4A90b2ceE40](https://rinkeby.etherscan.io/address/0xAe9821fbA4Bd76fd6D39859bd7c3d4A90b2ceE40)
  // * WitnetRequestBoardProxy: [0x9b42b0D80C428B17A5828dF5C2c96454ca54bD04](https://rinkeby.etherscan.io/address/0x9b42b0D80C428B17A5828dF5C2c96454ca54bD04)
  {
    abi: BtcUsdAbi as Array<AbiItem>,
    address: '0x58995FaD03158fB9cd64397347bA97714EF8fC12',
    witnetRequestBoard: {
      address: '0x9b42b0D80C428B17A5828dF5C2c96454ca54bD04',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    },
    network: Network.Rinkeby,
    name: 'btc/usd',
    label: '$',
    pollingPeriod: 10000
  },
  {
    abi: EthUsdAbi as Array<AbiItem>,
    address: '0xAe9821fbA4Bd76fd6D39859bd7c3d4A90b2ceE40',
    witnetRequestBoard: {
      address: '0x9b42b0D80C428B17A5828dF5C2c96454ca54bD04',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    },
    network: Network.Rinkeby,
    name: 'eth/usd',
    label: '$',
    pollingPeriod: 10000
  },
  // Goerli (id. 5) - v0.2.0:
  // * BtcUsdPriceFeed: [0x4958806608D2E3Aa22BD8818B555A0a24fe6c38E](https://goerli.etherscan.io/address/0x4958806608D2E3Aa22BD8818B555A0a24fe6c38E#contracts)
  // * EthUsdPriceFeed: [0xAa0AA725aEb1d382F909a8dE3041e9eaD6507501](https://goerli.etherscan.io/address/0xAa0AA725aEb1d382F909a8dE3041e9eaD6507501#contracts)
  // * WitnetRequestBoardProxy: [0x0C4be6AA667df48de54BA174bE7948875fdf152B](https://goerli.etherscan.io/address/0x0C4be6AA667df48de54BA174bE7948875fdf152B#contracts)
  {
    abi: BtcUsdAbi as Array<AbiItem>,
    address: '0x4958806608D2E3Aa22BD8818B555A0a24fe6c38E',
    network: Network.Goerli,
    name: 'btc/usd',
    label: '$',
    pollingPeriod: 10000,
    witnetRequestBoard: {
      address: '0x0C4be6AA667df48de54BA174bE7948875fdf152B',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    }
  },
  {
    abi: EthUsdAbi as Array<AbiItem>,
    address: '0xAa0AA725aEb1d382F909a8dE3041e9eaD6507501',
    network: Network.Goerli,
    name: 'eth/usd',
    label: '$',
    pollingPeriod: 10000,
    witnetRequestBoard: {
      address: '0x0C4be6AA667df48de54BA174bE7948875fdf152B',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    }
  },
  // Kovan (id. 42) - v0.2.0:
  // * BtcUsdPriceFeed: [0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E](https://kovan.etherscan.io/address/0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E#contracts)
  // * EthUsdPriceFeed: [0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8](https://kovan.etherscan.io/address/0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8#contracts)
  // * WitnetRequestBoardProxy: [0xD9a6d1Ea0d0f4795985725C7Bd40C31a667c033d](https://kovan.etherscan.io/address/0xD9a6d1Ea0d0f4795985725C7Bd40C31a667c033d#contracts)
  {
    abi: BtcUsdAbi as Array<AbiItem>,
    address: '0x9b3C5A6cB55E027d9ae6f265f6FB6fFA86e7b35E',
    network: Network.Kovan,
    name: 'btc/usd',
    label: '$',
    pollingPeriod: 15000,
    witnetRequestBoard: {
      address: '0xD9a6d1Ea0d0f4795985725C7Bd40C31a667c033d',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    }
  },
  {
    abi: EthUsdAbi as Array<AbiItem>,
    address: '0xA996939e6a07a0D1D6376c59BE515d8441f5E9b8',
    witnetRequestBoard: {
      address: '0x9b42b0D80C428B17A5828dF5C2c96454ca54bD04',
      abi: WitnetRequestBoardProxy as Array<AbiItem>
    },
    network: Network.Rinkeby,
    name: 'eth/usd',
    label: '$',
    pollingPeriod: 10000
  }
]
