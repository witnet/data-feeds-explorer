<template>
  <div class="countdown">
    <div v-if="distance > 0">{{ hours }}:{{ minutes }}:{{ seconds }}</div>
    <div v-else>00:00:00</div>
  </div>
</template>

<script>
const SECOND_IN_MILLISECONDS = 1000
const MINUTE_IN_MILLISECONDS = 60000
const HOUR_IN_MILLISECONDS = 3600000
const DAY_IN_MILLISECONDS = 86400000

export default {
  props: {
    milliseconds: {
      type: String,
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
      pollingInterval: null,
    }
  },
  computed: {
    distance() {
      return this.countdown - this.now
    },
    countdown() {
      // Last result timestamp to milliseconds plus heartbeat
      return (
        Number(`${this.lastResultTimestamp}000`) + Number(this.milliseconds)
      )
    },
    hours() {
      const hours = Math.floor(
        (this.distance % DAY_IN_MILLISECONDS) / HOUR_IN_MILLISECONDS
      )
      return hours < 10 ? `0${hours}` : hours
    },
    minutes() {
      const minutes = Math.floor(
        (this.distance % HOUR_IN_MILLISECONDS) / MINUTE_IN_MILLISECONDS
      )
      return minutes < 10 ? `0${minutes}` : minutes
    },
    seconds() {
      const seconds = Math.floor(
        (this.distance % MINUTE_IN_MILLISECONDS) / SECOND_IN_MILLISECONDS
      )
      return seconds < 10 ? `0${seconds}` : seconds
    },
  },
  watch: {
    distance(value) {
      if (value < 0) {
        clearInterval(this.pollingInterval)
      }
    },
    lastResultTimestamp() {
      clearInterval(this.pollingInterval)
      this.startPolling()
    },
  },
  beforeMount() {
    this.startPolling()
  },
  beforeDestroy() {
    clearInterval(this.pollingInterval)
  },
  methods: {
    startPolling() {
      this.pollingInterval = setInterval(() => {
        this.now = new Date().getTime()
      }, 1000)
    },
  },
}
</script>
