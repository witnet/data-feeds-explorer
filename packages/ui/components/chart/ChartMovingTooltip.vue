<template>
  <div class="tooltip font-bold">
    <p class="value">
      {{ value }}
    </p>
    <p class="time">{{ date }}</p>
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
  margin-top: -60px;
  font-size: 16px;
  background-color: $black;
  padding: 8px 16px;
  border-radius: 4px;
  color: $white;
  z-index: 13;
  .value {
    font-size: 16px;
  }
  .time {
    font-size: 12px;
    color: $white;
  }
}
</style>
