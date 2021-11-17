<template>
  <div v-if="!timeOver" class="countdown">
    <p class="title">Heartbeat</p>
    <div class="item">{{ hours }}:</div>
    <div class="item">{{ minutes }}:</div>
    <div class="item">{{ seconds }}</div>
  </div>
</template>

<script>
export default {
  props: {
    milliseconds: {
      type: Number,
      required: true,
    },
    lastResultTimestamp: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      now: new Date().getTime(),
      polling: null,
      timeOver: false,
    }
  },
  computed: {
    distance() {
      return this.countdown - this.now
    },
    countdown() {
      // Last result timestamp to milliseconds plus heartbeat
      return this.lastResultTimestamp * 1000 + this.milliseconds
    },
    second() {
      return 1000
    },
    minute() {
      return this.second * 60
    },
    hour() {
      return this.minute * 60
    },
    day() {
      return this.hour * 24
    },
    hours() {
      return Math.floor((this.distance % this.day) / this.hour)
    },
    minutes() {
      return Math.floor((this.distance % this.hour) / this.minute)
    },
    seconds() {
      return Math.floor((this.distance % this.minute) / this.second)
    },
  },
  watch: {
    distance(value) {
      if (value < 0) {
        clearInterval(this.polling)
        this.timeOver = true
      }
    },
  },
  beforeMount() {
    this.pollData()
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    pollData() {
      this.polling = setInterval(() => {
        this.now = new Date().getTime()
      }, 0)
    },
  },
}
</script>

<style scoped lang="scss">
.countdown {
  display: flex;
  .title {
    font-size: inherit;
    margin-right: 8px;
  }
}
</style>
