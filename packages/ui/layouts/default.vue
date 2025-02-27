<template>
  <div
    :class="{
      'hide-scroll': hideScroll,
      bg: hideScroll,
      background: true,
    }"
    class="component-root"
  >
    <div class="main-section-container">
      <div class="main-section">
        <NavBar @scroll="handleScroll" />
        <div
          class="cover"
          :class="{ show: hideScroll, bg: hideScroll }"
        />
        <BreadCrumbs />
        <slot />
        <client-only>
          <ThemeSwitch class="theme-switch" />
        </client-only>
      </div>
      <WFooter :footer-sections="footerLinks" />
    </div>
  </div>
</template>

<script setup>
import { WFooter } from 'wit-vue-ui'
import { ref } from 'vue'
// import { footerSections } from '../../constants'
// import getFooterLinks from './getFooterLinks'

const footerLinks = [
  {
    title: 'Developers',
    links: [
      {
        url: 'https://docs.witnet.io/smart-contracts/witnet-data-feeds/api-reference',
        label: 'Reference',
      },
      {
        url: 'https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/generating-randomness',
        label: 'Randomness',
      },
      {
        url: 'https://docs.witnet.io/smart-contracts/supported-chains',
        label: 'Supported chains',
      },
      {
        url: 'https://www.npmjs.com/package/witnet-solidity',
        label: 'Solidity SDK',
      },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      {
        url: 'https://witnet.network',
        label: 'Block Explorer',
      },
      {
        url: 'https://feeds.witnet.io',
        label: 'Data Feeds Explorer',
      },
      {
        url: 'https://sheikah.app',
        label: 'Sheikah',
      },
      {
        url: 'https://mywitwallet.com',
        label: 'myWitWallet',
      },
    ],
  },
  {
    title: 'Learn',
    links: [
      {
        url: 'https://witnet.io/witnet-whitepaper.pdf',
        label: 'Whitepaper',
      },
      {
        url: 'https://medium.com/witnet',
        label: 'Medium',
      },
      {
        url: 'https://docs.witnet.io/intro/tutorials',
        label: 'Tutorials',
      },
    ],
  },
]

const hideScroll = ref(false)

function handleScroll(scroll) {
  hideScroll.value = scroll
}
</script>
<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.background {
  transition: all 0.3s ease;
  @apply bg-white-50 dark:bg-black-950;
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
}

.cover {
  display: none;
  &.show {
    display: block;
    min-height: 100%;
    min-width: 100vw;
    position: absolute;
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
// .nuxt-link-exact-active {
//   color: var(--text);
// }
// .nuxt-link-active {
//   color: var(--text);
// }

a {
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
