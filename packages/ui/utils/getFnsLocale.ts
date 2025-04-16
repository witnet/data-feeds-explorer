import { es, enUS } from 'date-fns/locale'

export const getFnsLocale = (code: string) => {
  switch (code) {
    case 'es-ES':
      return es
    case 'en-US':
      return enUS
    default:
      return enUS
  }
}
