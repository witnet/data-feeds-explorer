<template>
  <div class="background">
    <MainSection>
      <NavBar slot="navbar" />
      <BreadCrumbs slot="breadcrumbs" :options="breadCumbsOptions" />
      <Nuxt slot="content" />
      <Footer slot="footer" />
    </MainSection>
  </div>
</template>

<script>
import { formatBreadcrumbsPath } from '@/utils/formatBreadcrumbsPath'
export default {
  data() {
    return {
      selected: [
        {
          label: 'ethereum-mainnet',
          key: 'Ethereum Mainnet',
          network: 'Ethereum',
        },
      ],
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
  computed: {
    breadCumbsOptions() {
      return [
        {
          label: 'Home',
          path: {
            name: 'index',
          },
          selected: false,
        },
        {
          label: formatBreadcrumbsPath(this.$route.params.id),
          path: {
            name: 'feeds-id',
            params: { id: this.$route.params.id },
          },
          selected: false,
        },
      ]
    },
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
