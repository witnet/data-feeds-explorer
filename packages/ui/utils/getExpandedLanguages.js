export function getExpandedLanguages(languages) {
  return languages.map((language) => ({
    ...language,
    label: language.name,
  }))
}
