<template>
  <div class="info-container">
    <div
      v-if="deviation"
      class="text-small-bold"
    >
      <InfoTooltip :value="$t('chart.deviation_text')">
        <p>{{ $t('chart.deviation') }}</p>
      </InfoTooltip>
      <div class="value">
        {{ deviation }}%
      </div>
    </div>
    <div class="item text-small-bold">
      <InfoTooltip :value="$t('chart.heartbeat_text')">
        <p>{{ $t('chart.heartbeat') }}</p>
      </InfoTooltip>
      <HeartbeatInfo
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
    column-gap: 8px;
    .value {
      display: flex;
      align-items: center;
    }
  }
}
</style>
