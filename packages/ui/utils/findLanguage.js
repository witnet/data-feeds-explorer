import { languages } from '../constants'
import { getExpandedLanguages } from './getExpandedLanguages'

export function findLanguage(locale) {
  return getExpandedLanguages(languages).find(
    (language) => language.code === locale,
  )
}
