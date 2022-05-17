<template>
  <div class="info-container">
    <div v-if="deviation" class="item">
      <InfoTooltip :value="$t('chart.deviation_text')">
        <p>{{ $t('chart.deviation') }}</p>
      </InfoTooltip>
      <div class="value">{{ deviation }}%</div>
    </div>
    <div class="item">
      <InfoTooltip :value="$t('chart.heartbeat_text')">
        <p>{{ $t('chart.heartbeat') }}</p>
      </InfoTooltip>
      <Heartbeat
        class="value"
        :milliseconds="maxTimeToResolve"
        :last-result-timestamp="lastResultTimestamp"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lastResultTimestamp: {
      type: String,
      required: true,
    },
    maxTimeToResolve: {
      type: Number,
      required: true,
    },
    deviation: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.info-container {
  padding: 16px;
  display: grid;
  grid-template-rows: max-content;
  row-gap: 16px;
  .item {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px;
    font-weight: bold;
    column-gap: 8px;
    .value {
      display: flex;
      align-items: center;
    }
  }
  .contract-address {
    display: flex;
    align-items: center;
    line-break: loose;
    word-break: break-all;
    font-size: var(--text-size-title);
    cursor: pointer;
    color: var(--contract-address);
    .icon {
      margin-left: 16px;
    }
  }
}
</style>
