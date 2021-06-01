<template>
  <font-awesome-icon class="mode-icon" :icon="icon" @click="toggleMode" />
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
    current() {
      return this.$colorMode.value
    },
    icon() {
      return this.themes[this.currentTheme].icon
    },
  },
  beforeMount() {
    this.currentTheme = this.$colorMode.value
  },
  methods: {
    toggleMode() {
      if (this.$colorMode.value === this.themes.dark.key) {
        this.$colorMode.preference = 'light'
        this.currentTheme = this.$colorMode.preference
      } else {
        this.$colorMode.preference = 'dark'
        this.currentTheme = this.$colorMode.preference
      }
    },
  },
}
</script>

<style scoped lang="scss">
.mode-icon {
  color: $green-1;
  font-size: 24px;
  margin: 16px 24px 16px 16px;
}
</style>
