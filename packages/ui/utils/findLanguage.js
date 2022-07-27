export function findLanguage(languages, locale) {
  return languages.find((language) => language.code === locale)
}
