import { defaultLocale } from '../default'
import { getLanguageFromUrl } from './getLanguageFromUrl'
import { findLanguage } from './findLanguage'

export function getCurrentLanguage(url) {
  return findLanguage(getLanguageFromUrl(url)) || findLanguage(defaultLocale)
}
