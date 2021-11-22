<template>
  <div class="container">
    <div :ref="label" class="value truncate">
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
      <font-awesome-icon class="icon" icon="info-circle" />
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
  },
  data() {
    return {
      showTooltip: false,
    }
  },
  computed: {
    textTopPosition() {
      return `${this.$refs.info.offsetTop - 30}px`
    },
    textLeftPosition() {
      return `${this.$refs.info.offsetLeft + 10}px`
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
  color: var(--text-hover);
}
.tooltip,
.info-tooltip {
  position: absolute;
  display: inline-block;
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
  padding: 10px;
  color: var(--text-hover);
  margin: -10px;
  font-size: 10px;
  cursor: pointer;
}
</style>
