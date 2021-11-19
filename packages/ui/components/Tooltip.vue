<template>
  <div v-show="tooltip" class="tooltip">
    <p>{{ value }}</p>
    <p class="item">{{ date }}</p>
    <p class="item"><span class="title">Deviation</span> {{ deviation }}%</p>
    <p class="item">
      <span class="title">Heartbeat</span>
      <Heartbeat
        class="countdown"
        :milliseconds="heartbeat"
        :last-result-timestamp="lastResultTimestamp"
      />
    </p>
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
  font-weight: bold;
  font-size: 32px;
  background-color: var(--text-background);
  color: var(--text);

  .item {
    font-size: 16px;
    margin-top: 8px;
    color: var(--text-medium-emphasis);
    .title {
      font-size: 16px;
      color: var(--text-hover);
    }
  }
}
</style>
