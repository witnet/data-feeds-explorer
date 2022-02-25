<template>
  <div class="tooltip-container">
    <div class="tooltip">
      <div class="feed-title">
        <SvgIcon v-if="svgIcon" class="icon" :name="svgIcon" />
        <p v-if="name" class="feed-name">
          {{ name.toUpperCase() }}
        </p>
      </div>
      <p class="value">{{ $t('chart.last_update') }}</p>
      <p class="value">
        {{ lastResultValue }}
        <span class="time">{{ calculateTime() }}</span>
      </p>
    </div>
    <a :href="useDataFeedUrl" target="_blank">
      <Button class="btn" type="secondary">{{
        $t('chart.use_data_feed')
      }}</Button>
    </a>
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
    name: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    lastResultValue: {
      type: String,
      default: '',
    },
    lastResultTimestamp: {
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
      return calculateTimeAgo(this.lastResultTimestamp, this.$i18n.locale)
    },
  },
}
</script>

<style scoped lang="scss">
.tooltip-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.tooltip {
  font-family: Almarai, sans-serif;
  font-weight: bold;
  font-size: 24px;
  background-color: var(--bg);
  color: var(--text);
  .feed-title {
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 8px 0;
    .icon {
      display: flex;
    }
    .feed-name {
      margin-left: 8px;
    }
  }
  .item {
    font-size: 16px;
    margin-top: 8px;
    color: var(--text-medium-emphasis);
    display: flex;
    .title {
      font-size: 1.4rem;
      margin-right: 10px;
      color: var(--text-hover);
    }
  }
  .value {
    font-family: Almarai, sans-serif;
    font-size: 16px;
    .time {
      font-size: 12px;
      color: var(--text-medium-emphasis);
    }
  }
}
@media (max-width: 1200px) {
  .tooltip-container {
    margin: 16px;
  }
}
</style>
