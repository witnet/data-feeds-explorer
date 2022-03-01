<template>
  <div class="tooltip-container">
    <div class="tooltip">
      <div class="feed-title">
        <SvgIcon v-if="svgIcon" class="icon" :name="svgIcon" />
        <p v-if="name" class="feed-name">
          {{ name.toUpperCase() }}
        </p>
      </div>
      <p class="value-title">{{ $t('chart.last_update') }}</p>
      <p class="value">
        {{ lastResultValue }}
        <span class="time">{{ calculateTime() }}</span>
      </p>
      <p class="value-title">{{ $t('chart.status') }}</p>
      <DataFeedStatus
        :last-result-timestamp="lastResultTimestamp"
        :heartbeat="heartbeat"
      />
    </div>
    <InnerLink class="link" hash="integrate">
      <Button class="btn" type="secondary">{{
        $t('chart.use_data_feed')
      }}</Button>
    </InnerLink>
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
    heartbeat: {
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
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 16px;
  justify-content: space-between;
  margin-bottom: 24px;
}
.link {
  align-self: start;
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
    margin-bottom: 8px;
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
  .value-title {
    font-size: 12px;
  }
  .value {
    font-family: Almarai, sans-serif;
    font-size: 16px;
    margin-bottom: 8px;
    .time {
      font-size: 12px;
      color: var(--text-medium-emphasis);
    }
  }
}
@media screen and (max-width: 1100px) {
  .tooltip-container {
    padding: 0 16px;
  }
}
@media (max-width: 600px) {
  .tooltip-container {
    grid-template-columns: 1fr;
    margin: 0 16px;
    margin-bottom: 32px;
  }
  .link {
    justify-self: flex-end;
    align-self: flex-end;
  }
}
</style>
