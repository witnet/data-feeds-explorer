<template>
  <div
    :class="{
      'hide-scroll': hideScroll,
      preload,
      background: true,
      'dark-mode': true,
    }"
    class="component-root"
  >
    <div class="main-section-container">
      <div class="main-section">
        <NavBar @scroll="handleScroll" />
        <div class="cover" :class="{ show: hideScroll }"></div>
        <BreadCrumbs />
        <slot />
        <client-only>
          <ThemeSwitch class="theme-switch" />
        </client-only>
      </div>
      <FooterSection />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideScroll: false,
      preload: true,
    }
  },
  created() {
    this.preload = false
  },
  methods: {
    handleScroll(scroll) {
      this.hideScroll = scroll
    },
  },
}
</script>
<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
html {
  font-size: var(--text-size);
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
  background-color: var(--bg);
}
.background {
  background-color: var(--bg);
  transition: all 0.3s ease;
  &.preload {
    transition: none !important;
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -ms-transition: none !important;
    -o-transition: none !important;
  }
}
.hide-scroll {
  height: 100vh;
  position: absolute;
  overflow-y: hidden;
  background-color: var(--bg);
}

.cover {
  display: none;
  &.show {
    display: block;
    min-height: 100%;
    min-width: 100vw;
    position: absolute;
    background: var(--bg);
    z-index: 14;
  }
}

html,
body {
  margin: 0;
  padding: 0;
  padding-top: env(safe-area-inset-top, 1em);
  padding-right: env(safe-area-inset-right, 1em);
  padding-bottom: env(safe-area-inset-bottom, 1em);
  padding-left: env(safe-area-inset-left, 1em);
  width: 100vw;
  overflow-x: hidden;
}
.nuxt-link-exact-active {
  color: var(--text);
}
.nuxt-link-active {
  color: var(--text);
}

a {
  color: var(--text);
  text-decoration: none;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.main-section-container {
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: 1fr;
}
.main-section {
  color: var(--text);
  display: grid;
  min-height: max-content;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-columns: 1fr;
  width: 100vw;
  max-width: var(--desktop-margin);
  row-gap: 24px;
  margin: 0 auto;
  .theme-switch {
    position: fixed;
    bottom: 0;
    z-index: 5;
    right: 0;
  }
}
@media (max-width: 850px) {
  .main-section {
    grid-template-rows: max-content max-content max-content;
    padding: 0;
  }
}
</style>
