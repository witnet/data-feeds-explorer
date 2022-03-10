<template>
  <i18n
    path="data_feed_details.feed_description"
    tag="p"
    class="feed-description"
  >
    <template #name>
      <span class="bold">{{ feedName }}</span>
    </template>
    <template #network>
      <span class="bold">{{ network }}</span>
    </template>
    <template #value>
      <span class="bold">{{ lastResultValue }}</span>
    </template>
    <template #date>
      <span class="bold">{{ lastResultDate }}</span>
    </template>
    <template #heartbeat>
      <span class="bold">{{ feedTimeToUpdate }}</span>
    </template>
    <template #deviation>
      <span class="bold">{{ deviation }}%</span>
    </template>
  </i18n>
</template>

<script>
export default {
  props: {
    deviation: {
      type: String,
      required: true,
    },
    feedTimeToUpdate: {
      type: String,
      required: true,
    },
    lastResultDate: {
      type: String,
      required: true,
    },
    lastResultValue: {
      type: String,
      required: true,
    },
    chain: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    feedName: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.feed-description {
  font-size: var(--text-size);
  padding: 16px;
  margin-top: 16px;
}
</style>
