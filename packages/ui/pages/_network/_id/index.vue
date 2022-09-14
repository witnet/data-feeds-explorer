<template>
  <DataFeedDetails
    @feed-name="setFeedName"
    @network="setNetwork"
    @feed-value="setFeedValue"
    @feed-date="setFeedDate"
  />
</template>

<script>
export default {
  data() {
    return {
      currentFeedName: '',
      lastResultValue: '',
      lastResultDate: '',
      selectedNetwork: '',
    }
  },
  i18n: {
    seo: true,
  },
  head() {
    return {
      title: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
      ],
    }
  },
  computed: {
    selectedDataFeed() {
      return this.$store.state.selectedNetwork
        ? this.$store.state.selectedNetwork[0]?.label
        : null
    },
  },
  methods: {
    setFeedName(name) {
      this.currentFeedName = name
    },
    setNetwork(network) {
      this.selectedNetwork = network
    },
    setFeedValue(value) {
      this.lastResultValue = value
    },
    setFeedDate(date) {
      this.lastResultDate = date
    },
  },
}
</script>
