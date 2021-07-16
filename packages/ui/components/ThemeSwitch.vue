<template>
  <div class="icon-container">
    <font-awesome-icon class="mode-icon" :icon="icon" @click="toggleMode" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTheme: 'light',
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
    current() {
      return this.$colorMode.value
    },
    icon() {
      return this.themes[this.currentTheme].icon
    },
  },
  beforeMount() {
    if (this.$colorMode.value !== 'system') {
      this.currentTheme = this.$colorMode.value
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
