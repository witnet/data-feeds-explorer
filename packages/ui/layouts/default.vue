<template>
  <div class="background">
    <MainSection>
      <NavBar slot="navbar" />
      <Nuxt slot="content" />
      <Footer slot="footer" />
    </MainSection>
  </div>
</template>

<script>
export default {
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: var(--bg);
}

html,
body {
  margin: 0;
  padding: 0;
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
