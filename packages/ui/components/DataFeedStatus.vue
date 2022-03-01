<template>
  <div class="status-container">
    <StatusDotSvg :color="statusColor" />
    <p class="status">{{ statusLabel }}</p>
  </div>
</template>

<script>
import { getDataFeedStatus } from '@/utils/getDataFeedStatus'
export default {
  props: {
    heartbeat: {
      type: Number,
      required: true,
    },
    lastResultTimestamp: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusColor() {
      return getDataFeedStatus(this.heartbeat, this.lastResultTimestamp).color
    },
    statusLabel() {
      return getDataFeedStatus(this.heartbeat, this.lastResultTimestamp).label
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
