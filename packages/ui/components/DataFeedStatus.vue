<template>
  <div class="status-container">
    <StatusDotSvg :color="dataFeedStatus.color" />
    <p class="status">
      {{ $t(`chart.${dataFeedStatus.key}`) }}
    </p>
  </div>
</template>

<script>
import { getDataFeedStatus } from '@/utils/getDataFeedStatus'
export default {
  props: {
    timeToUpdate: {
      type: Number,
      required: true,
    },
    lastResultTimestamp: {
      type: String,
      required: true,
    },
  },
  computed: {
    dataFeedStatus() {
      return getDataFeedStatus(this.timeToUpdate, this.lastResultTimestamp)
    },
  },
}
</script>

<style lang="scss" scoped>
.status-container {
  display: flex;
  align-items: center;

  .status {
    margin-left: 8px;
    font-size: var(--text-size-medium);
  }
}
</style>
