<template>
  <i18n
    v-if="isRouted && feedTimeToUpdate"
    path="data_feed_details.feed_description_routed_cached"
    tag="p"
    class="feed-description"
  >
    <template #name>
      <span class="bold">{{ feedName }}</span>
    </template>
    <template #network>
      <span class="bold">{{ networkName }}</span>
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
  </i18n>
  <i18n
    v-else-if="isRouted"
    path="data_feed_details.feed_description_routed"
    tag="p"
    class="feed-description"
  >
    <template #name>
      <span class="bold">{{ feedName }}</span>
    </template>
    <template #network>
      <span class="bold">{{ networkName }}</span>
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
  </i18n>
  <i18n
    v-else
    path="data_feed_details.feed_description"
    tag="p"
    class="feed-description"
  >
    <template #name>
      <span class="bold">{{ feedName }}</span>
    </template>
    <template #network>
      <span class="bold">{{ networkName }}</span>
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
    isRouted: {
      type: Boolean,
      required: true,
    },
    feedTimeToUpdate: {
      type: String,
      default: null,
    },
    lastResultDate: {
      type: String,
      required: true,
    },
    lastResultValue: {
      type: String,
      required: true,
    },
    networkName: {
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
