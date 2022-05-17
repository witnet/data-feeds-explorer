import axios from 'axios'
import { removeRepeatedElements } from './utils'

export const DEFAULT_SVG =
  '<svg class="icon-size" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17" cy="17" r="17" fill="#C4C4C4"/><path d="M18.066 20.785h-2.988a9.951 9.951 0 0 1 .164-1.816c.11-.516.293-.98.551-1.395a6.466 6.466 0 0 1 1.055-1.23c.367-.328.687-.64.96-.938.274-.297.489-.601.645-.914.156-.32.235-.676.235-1.066 0-.453-.07-.828-.211-1.125a1.428 1.428 0 0 0-.61-.692c-.265-.156-.601-.234-1.008-.234-.336 0-.648.074-.937.223-.29.14-.527.359-.715.656-.18.297-.273.687-.281 1.172h-3.399c.024-1.07.27-1.953.739-2.649a4.252 4.252 0 0 1 1.91-1.558c.797-.344 1.691-.516 2.683-.516 1.094 0 2.032.18 2.813.54.781.35 1.379.87 1.793 1.558.414.68.62 1.508.62 2.484 0 .68-.132 1.285-.398 1.817a6.21 6.21 0 0 1-1.043 1.464c-.43.454-.902.922-1.417 1.407-.446.398-.75.816-.915 1.254-.156.437-.238.957-.246 1.558Zm-3.34 3.621c0-.5.172-.914.516-1.242.344-.336.805-.504 1.383-.504.57 0 1.027.168 1.371.504.352.328.527.742.527 1.242 0 .485-.175.895-.527 1.23-.344.337-.8.505-1.371.505-.578 0-1.04-.168-1.383-.504a1.655 1.655 0 0 1-.515-1.23Z" fill="#fff"/></svg>'

const STATIC_LOGOS_SVG_URL =
  'https://raw.githubusercontent.com/witnet/data-feeds-explorer/main/packages/ui/assets/svg/'

export async function fetchSvgs (
  networksToFetch: Array<string>
): Promise<{ [key: string]: string }> {
  const networksWithoutRepeated = removeRepeatedElements(networksToFetch)
  const logosUrls = networksWithoutRepeated.map(
    (networkToFetch: string) => `${STATIC_LOGOS_SVG_URL}${networkToFetch}.svg`
  )

  // Fetch all logos from github
  const promises = logosUrls.map(url => axios.get(url))
  return new Promise(resolve => {
    Promise.allSettled(promises).then(results => {
      const svgs = results.map((result, index) => {
        if (result.status === 'rejected') {
          console.log(`Error fetching logo from: ${logosUrls[index]}`)
          return DEFAULT_SVG
        }

        return result.value.data
      })

      const svgByName = networksWithoutRepeated.reduce(
        (acc, val, index) => ({
          ...acc,
          [val]: svgs[index]
        }),
        {}
      )

      resolve(svgByName)
    })
  })
}
