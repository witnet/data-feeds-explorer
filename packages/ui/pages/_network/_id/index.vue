<template>
  <DataFeedDetails
    @feed-name="setFeedName"
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
    }
  },
  i18n: {
    seo: true,
  },
  head() {
    return {
      title: `${this.currentFeedName} Witnet Data Feed on ${this.selectedDataFeed}`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedDataFeed}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedDataFeed} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedDataFeed}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedDataFeed} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedDataFeed}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedDataFeed} is ${this.lastResultValue} at ${this.lastResultDate}`,
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
    setFeedValue(value) {
      this.lastResultValue = value
    },
    setFeedDate(date) {
      this.lastResultDate = date
    },
  },
}
</script>
