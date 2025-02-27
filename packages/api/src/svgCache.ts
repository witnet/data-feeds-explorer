import NodeCache from 'node-cache'
import { DEFAULT_SVG, fetchSvgs } from './fetchSvgs.js'

export class SvgCache {
  cache: NodeCache

  constructor() {
    this.cache = new NodeCache({ checkperiod: 0 })
  }

  async getMany(svgNames: Array<string>): Promise<{ [key: string]: string }> {
    const missingSvgs = svgNames.filter((name) => !this.cache.get(name))
    const fetchedSvgs = await fetchSvgs(missingSvgs)
    // set missing svgs
    Object.entries(fetchedSvgs).forEach(([key, value]) => {
      if (value !== DEFAULT_SVG) {
        this.cache.set(key, value)
      }
    })

    return svgNames.reduce(
      (acc, name) => ({
        ...acc,
        [name]: this.cache.get(name) || fetchedSvgs[name],
      }),
      {},
    )
  }
}

export default SvgCache
