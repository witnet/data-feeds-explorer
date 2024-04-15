<template>
  <div class="container">
    <div v-if="showIcon" :ref="value" class="value truncate">
      <slot></slot>
    </div>
    <div
      v-else
      :ref="value"
      class="value truncate show-info"
      @mousemove="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <slot></slot>
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
        :class="{ hidden: showInResponsive }"
        :style="{ top: textTopPosition, left: textLeftPosition }"
      >
        {{ value }}
      </div>
      <client-only>
        <font-awesome-icon v-if="showIcon" class="icon" icon="info-circle" />
      </client-only>
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
    showIcon: {
      type: Boolean,
      default: true,
    },
    showInResponsive: {
      type: Boolean,
      default: false,
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
  font-size: var(--text-size);
  margin-right: 8px;
  &.show-info {
    margin-right: 0;
  }
}
.tooltip,
.info-tooltip {
  position: absolute;
  display: inline-block;
  max-width: 400px;
  border-radius: 4px;
  font-size: var(--text-size-small);
  padding: 8px;
  background-color: var(--bg);
  color: var(--text-medium-emphasis);
  &.hidden {
    display: none;
  }
}
.container {
  display: flex;
  align-items: center;
  width: min-content;
}
.info {
  display: flex;
  align-items: center;
  font-size: 10px;
  width: 10px;
  height: 10px;
  cursor: pointer;
}
@media (max-width: 300px) {
  .info-tooltip {
    &.hidden {
      display: block;
    }
  }
}
</style>
