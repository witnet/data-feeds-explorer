<template>
  <div class="icon-container" @click="toggleMode">
    <font-awesome-icon class="mode-icon" :icon="icon" />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const themes: any = {
  light: {
    icon: 'moon',
    key: 'light',
  },
  dark: {
    icon: 'sun',
    key: 'dark',
  },
}
const currentTheme: Ref<string> = ref(colorMode.value)
const icon = computed(() => themes[colorMode.value].icon)
const toggleMode = () => {
  if (colorMode.value === themes.dark.key) {
    colorMode.preference = 'light'
  } else {
    colorMode.preference = 'dark'
  }
  currentTheme.value = colorMode.preference
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
