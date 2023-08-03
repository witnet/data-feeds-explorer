<template>
  <DataFeedDetails
    @feed-name="setFeedName"
    @network="setNetwork"
    @feed-value="setFeedValue"
    @feed-date="setFeedDate"
  />
</template>

<script setup>
// not available yet
// i18n: {
//  seo: true,
// },
// head() {
//   return {
//     title: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
//     meta: [
//       {
//         hid: 'title',
//         name: 'title',
//         content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
//       },
//       {
//         hid: 'description',
//         name: 'description',
//         content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
//       },
//       {
//         hid: 'twitter:title',
//         name: 'twitter:title',
//         content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
//       },
//       {
//         hid: 'twitter:description',
//         name: 'twitter:description',
//         content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
//       },
//       {
//         hid: 'og:title',
//         property: 'og:title',
//         content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
//       },
//       {
//         hid: 'og:description',
//         property: 'og:description',
//         content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
//       },
//     ],
//   }
// },

// const store = useNetwork()
const currentFeedName = ref('')
const lastResultValue = ref('')
const lastResultDate = ref('')
const selectedNetwork = ref('')
// const selectedDataFeed = computed(() => {
//   return store.selectedNetwork ? store.selectedNetwork[0]?.label : null
// })

function setFeedName(name) {
  currentFeedName.value = name
}
function setNetwork(network) {
  selectedNetwork.value = network
}
function setFeedValue(value) {
  lastResultValue.value = value
}
function setFeedDate(date) {
  lastResultDate.value = date
}
</script>
