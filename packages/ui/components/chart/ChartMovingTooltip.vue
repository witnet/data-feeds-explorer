<template>
  <div class="tooltip">
    <p class="value">
      {{ value }}
    </p>
    <p class="time">
      {{ date }}
    </p>
  </div>
</template>

<script>
import { formatSvgName } from '@/utils/formatSvgName'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
  computed: {
    svgIcon() {
      return this.name ? formatSvgName(this.name.toLowerCase()) : ''
    },
  },
}
</script>

<style scoped lang="scss">
.tooltip {
  position: relative;
  font-weight: bold;
  margin-top: -60px;
  font-size: var(--text-size-title);
  background-color: var(--tooltip-bg);
  padding: 8px 16px;
  border-radius: 4px;
  color: var(--text);
  z-index: 13;

  .value {
    font-size: var(--text-size);
  }

  .time {
    font-size: var(--text-size-small);
    color: var(--text-medium-emphasis);
  }
}
</style>
