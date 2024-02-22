import { ThemeKey } from '@/types'

const colorMode = useColorMode()

export const themeFromColorValue = computed(() => {
  switch (colorMode.value) {
    case 'light':
      return ThemeKey.light
    case 'dark':
      return ThemeKey.dark
    default:
      return ThemeKey.dark
  }
})

export function changeColorMode(theme: ThemeKey) {
  colorMode.preference = theme
}
