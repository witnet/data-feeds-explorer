import { witnetBlockExplorerUrl } from '../constants'

export function getWitnetBlockExplorerLink(drTxHash) {
  return `${witnetBlockExplorerUrl}/${drTxHash}`
}
