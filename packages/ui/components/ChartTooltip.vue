<template>
  <div class="tooltip">
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
</template>

<script>
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
}
</script>

<style scoped lang="scss">
.tooltip {
  font-family: Almarai, sans-serif;
  font-weight: bold;
  font-size: 32px;
  background-color: var(--bg);
  color: var(--text);

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
