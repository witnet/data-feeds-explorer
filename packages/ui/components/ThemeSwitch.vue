<template>
  <div class="icon-container">
    <font-awesome-icon class="mode-icon" :icon="icon" @click="toggleMode" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTheme: 'dark',
      themes: {
        light: {
          icon: 'moon',
          key: 'light',
        },
        dark: {
          icon: 'sun',
          key: 'dark',
        },
      },
    }
  },
  computed: {
    icon() {
      return this.themes[this.currentTheme].icon
    },
  },
  mounted() {
    if (this.$colorMode.value === 'system') {
      this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
    } else {
      this.currentTheme = this.$colorMode
    }
  },
  methods: {
    toggleMode() {
      if (this.$colorMode.value === this.themes.dark.key) {
        this.$colorMode.preference = 'light'
      } else {
        this.$colorMode.preference = 'dark'
      }
      this.currentTheme = this.$colorMode.preference
    },
  },
}
</script>

<style scoped lang="scss">
.mode-icon {
  color: var(--icon-color);
  font-size: 20px;
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
