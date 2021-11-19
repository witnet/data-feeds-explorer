<template>
  <span v-if="!timeOver" class="countdown">
    {{ hours }}:{{ minutes }}:{{ seconds }}
  </span>
</template>

<script>
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
      const hours = Math.floor((this.distance % this.day) / this.hour)
      return hours < 10 ? `0${hours}` : hours
    },
    minutes() {
      const minutes = Math.floor((this.distance % this.hour) / this.minute)
      return minutes < 10 ? `0${minutes}` : minutes
    },
    seconds() {
      const seconds = Math.floor((this.distance % this.minute) / this.second)
      return seconds < 10 ? `0${seconds}` : seconds
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
