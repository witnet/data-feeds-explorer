<template>
  <div class="tooltip-container">
    <div class="tooltip">
      <div class="feed-title">
        <SvgIcon v-if="svgIcon" class="icon" :name="svgIcon" />
        <p v-if="name" class="feed-name">
          {{ name.toUpperCase() }}
        </p>
      </div>
      <p class="value">{{ value }}</p>
      <p class="item">{{ date }}</p>
      <div class="item">
        <InfoTooltip
          :label="$t('chart.deviation')"
          class="title"
          :value="$t('chart.deviation_text')"
        />
        <div>{{ deviation }}%</div>
      </div>
      <div class="item">
        <InfoTooltip
          :label="$t('chart.heartbeat')"
          class="title"
          :value="$t('chart.heartbeat_text')"
        />
        <Heartbeat
          class="countdown"
          :milliseconds="heartbeat"
          :last-result-timestamp="lastResultTimestamp"
        />
      </div>
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
    deviation: {
      type: String,
      default: '',
    },
    heartbeat: {
      type: String,
      default: '',
    },
    lastResultTimestamp: {
      type: String,
      default: '',
    },
  },
  computed: {
    svgIcon() {
      return this.name ? formatSvgName(this.name.toLowerCase()) : ''
    },
    useDataFeedUrl,
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
  font-size: 32px;
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
    .value {
      font-family: Almarai, sans-serif;
    }
  }
}
</style>
