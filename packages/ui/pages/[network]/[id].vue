<template>
  <div>
    <DataFeedDetails
      @feed-name="setFeedName"
      @network="setNetwork"
      @feed-value="setFeedValue"
      @feed-date="setFeedDate"
    />
  </div>
</template>

<script setup lang="ts">
const currentFeedName = ref('')
const lastResultValue = ref('')
const lastResultDate = ref('')
const selectedNetwork = ref('')

const setFeedName = (name: string) => (currentFeedName.value = name)
const setNetwork = (network: string) => (selectedNetwork.value = network)
const setFeedValue = (value: string) => (lastResultValue.value = value)
const setFeedDate = (date: string) => (lastResultDate.value = date)
</script>
