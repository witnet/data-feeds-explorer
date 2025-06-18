<template>
  <div class="p-lg grid gap-md">
    <div v-if="deviation" class="flex sm:flex-col gap-md text-bold">
      <InfoTooltip :value="$t('chart.deviation_text')">
        <p>{{ $t('chart.deviation') }}</p>
      </InfoTooltip>
      <div class="text-highlighted">{{ deviation }}%</div>
    </div>
    <div class="flex sm:flex-col gap-md text-bold">
      <InfoTooltip :value="$t('chart.heartbeat_text')">
        <p>{{ $t('chart.heartbeat') }}</p>
      </InfoTooltip>
      <HeartbeatInfo
        class="text-highlighted"
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
