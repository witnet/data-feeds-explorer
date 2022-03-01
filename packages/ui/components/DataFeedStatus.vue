<template>
  <div class="status-container">
    <StatusDotSvg :color="statusColor" />
    <p class="status">{{ statusLabel }}</p>
  </div>
</template>

<script>
export default {
  props: {
    heartbeat: {
      type: String,
      required: true,
    },
    lastResultTimestamp: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentStatus: 'operational',
      status: {
        operational: {
          label: 'Fully operational',
          color: '#4AB6A1',
        },
        error: {
          label: 'Error detected',
          color: '#DF4B4B',
        },
        delay: {
          label: 'Delay detected',
          color: '#DFC44B',
        },
      },
    }
  },
  computed: {
    statusColor() {
      return this.getCurrentStatus().color
    },
    statusLabel() {
      return this.getCurrentStatus().label
    },
  },
  methods: {
    getCurrentStatus() {
      const updateLimitTimestamp = new Date().getTime() - Number(this.heartbeat)
      if (updateLimitTimestamp > Number(`${this.lastResultTimestamp}000`)) {
        return this.status.delay
      } else {
        return this.status.operational
      }
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
    font-size: 14px;
  }
}
</style>
