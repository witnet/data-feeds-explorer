import { urls } from '../constants'

export function getWitnetBlockExplorerLink(drTxHash) {
  return `${urls.blockExplorer}/${drTxHash}`
}
