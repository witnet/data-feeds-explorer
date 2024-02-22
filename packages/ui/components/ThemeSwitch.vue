<template>
  <div class="icon-container" @click="toggleMode">
    <font-awesome-icon class="mode-icon" :icon="icon" />
  </div>
</template>

<script setup lang="ts">
import { type Themes, ThemeKey } from '@/types'
import { themeFromColorValue, changeColorMode } from '@/utils/colorMode'

const themes: Themes = {
  [ThemeKey.light]: {
    icon: 'moon',
    key: ThemeKey.light,
  },
  [ThemeKey.dark]: {
    icon: 'sun',
    key: ThemeKey.dark,
  },
}

const icon = computed(() => themes[themeFromColorValue.value].icon)
const toggleMode = () => {
  if (themeFromColorValue.value === ThemeKey.light) {
    changeColorMode(ThemeKey.dark)
  } else {
    changeColorMode(ThemeKey.light)
  }
}
</script>

<style scoped lang="scss">
.mode-icon {
  color: var(--icon-color);
  font-size: 20px;
  width: 20px;
  height: 20px;
  &:hover {
    transform: scale(1.1);
  }
}
.icon-container {
  cursor: pointer;
  background-color: var(--icon-background);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 16px;
}
</style>
