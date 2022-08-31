<template>
  <Main />
</template>

<script>
export default {
  i18n: {
    seo: true,
  },
  head() {
    return {
      title: `Witnet Data Feeds on ${this.selectedNetwork}`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `Witnet Data Feeds on ${this.selectedNetwork}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `Explore the list of decentralized data feeds on ${this.selectedNetwork}, using the Witnet oracle network`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Witnet Data Feeds on ${this.selectedNetwork}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Explore the list of decentralized data feeds on ${this.selectedNetwork}, using the Witnet oracle network`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Witnet Data Feeds on ${this.selectedNetwork}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Explore the list of decentralized data feeds on ${this.selectedNetwork}, using the Witnet oracle network`,
        },
      ],
    }
  },
  computed: {
    selectedNetwork() {
      return this.$store.state.selectedNetwork
        ? this.$store.state.selectedNetwork[0]?.chain
        : null
    },
  },
}
</script>
