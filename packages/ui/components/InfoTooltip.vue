<template>
  <div class="container">
    <div v-if="showIcon" :ref="label" class="value truncate">
      {{ label }}
    </div>
    <div
      v-else
      :ref="label"
      class="value truncate"
      @mousemove="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      {{ label }}
    </div>
    <div
      ref="info"
      class="info"
      @mousemove="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <div
        v-if="showTooltip"
        class="info-tooltip"
        :style="{ top: textTopPosition, left: textLeftPosition }"
      >
        {{ value }}
      </div>
      <font-awesome-icon v-if="showIcon" class="icon" icon="info-circle" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showTooltip: false,
    }
  },
  computed: {
    textTopPosition() {
      return `${this.$refs.info.offsetTop - 40}px`
    },
    textLeftPosition() {
      return `${this.$refs.info.offsetLeft - 70}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0;
  margin-right: 8px;
  font-size: 16px;
}
.tooltip,
.info-tooltip {
  position: absolute;
  display: inline-block;
  max-width: 400px;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: var(--bg);
  color: var(--text-medium-emphasis);
}
.container {
  display: flex;
}
.info {
  display: flex;
  align-items: center;
  font-size: 10px;
  cursor: pointer;
}
</style>
