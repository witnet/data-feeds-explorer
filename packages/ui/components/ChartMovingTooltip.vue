<template>
  <div class="tooltip">
    <p class="value">
      {{ value }}
    </p>
    <p class="time">{{ date }}</p>
  </div>
</template>

<script>
import { formatSvgName } from '@/utils/formatSvgName'
import { useDataFeedUrl } from '@/constants'
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'

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
  data() {
    return {
      useDataFeedUrl,
    }
  },
  computed: {
    svgIcon() {
      return this.name ? formatSvgName(this.name.toLowerCase()) : ''
    },
  },
  methods: {
    calculateTime() {
      return calculateTimeAgo(this.date, this.$i18n.locale)
    },
  },
}
</script>

<style scoped lang="scss">
.tooltip {
  font-family: Almarai, sans-serif;
  position: relative;
  font-weight: bold;
  margin-top: -60px;
  font-size: 24px;
  background-color: var(--tooltip-bg);
  padding: 8px 16px;
  border-radius: 4px;
  color: var(--text);
  z-index: 1000;
  .value {
    font-family: Almarai, sans-serif;
    font-size: 16px;
  }
  .time {
    font-size: 12px;
    color: var(--text-medium-emphasis);
  }
}
</style>
