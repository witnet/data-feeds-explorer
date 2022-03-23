<template>
  <div class="background" :class="{ 'hide-scroll': hideScroll }">
    <MainSection>
      <NavBar slot="navbar" @scroll="handleScroll" />
      <div slot="cover" class="cover" :class="{ show: hideScroll }"></div>
      <BreadCrumbs slot="breadcrumbs" />
      <div slot="content">
        <transition name="fade">
          <nuxt />
        </transition>
      </div>
      <Footer slot="footer" />
    </MainSection>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideScroll: false,
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
  methods: {
    handleScroll(scroll) {
      this.hideScroll = scroll
    },
  },
}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
img {
  width: 100%;
  height: 100%;
}
html {
  font-family: Almarai, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: var(--text-size);
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: var(--bg);
  scroll-behavior: smooth;
}
.hide-scroll {
  height: 100vh;
  position: absolute;
  overflow-y: hidden;
  background: var(--bg);
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
</style>
