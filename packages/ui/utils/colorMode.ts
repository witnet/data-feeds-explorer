import { ThemeKey } from '@/types'
import { useColorMode } from '@vueuse/core'

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
  colorMode.value = theme
}
