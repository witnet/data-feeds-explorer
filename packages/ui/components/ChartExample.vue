<template>
  <div ref="container">
    <div v-show="tooltip" class="tooltip">
      <span class="value">
        {{ value }} <span class="date"> {{ date }}</span></span
      >
      <span class="name"> {{ name }} </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    dataLabel: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tooltip: true,
      dateTooltip: true,
      width: 400,
      height: 300,
      value: '',
      date: '',
      toolTipWidth: 100,
      tooltipLeftPosition: 10,
    }
  },
  computed: {
    chart() {
      const { LightWeightCharts } = this.$lwcCore()
      return LightWeightCharts.createChart(this.$refs.container, {
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          visible: true,
        },
        crosshair: {
          horzLine: {
            visible: false,
          },
          vertLine: {
            visible: true,
          },
        },
        layout: {
          backgroundColor: 'transparent',
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: {
            color: 'transparent',
          },
          horzLines: {
            color: 'transparent',
          },
        },
      })
    },
    lineChart() {
      return this.chart.addAreaSeries({
        topColor: '#41BEA556',
        bottomColor: '#41BEA504',
        lineColor: '#41BEA5',
        lineWidth: 2,
      })
    },
  },
  watch: {
    data: {
      deep: true,
      handler(oldvalue, newvalue) {
        if (oldvalue !== newvalue) {
          const oldTime = oldvalue.map((data) => data.time)
          const newTime = newvalue.map((data) => this.dateToString(data.time))
          const newDataTime = oldTime.filter((val) => !newTime.includes(val))
          const dataToUpdate = oldvalue.filter((val) =>
            newDataTime.includes(val.time)
          )
          dataToUpdate.forEach((el) => this.updateData(el))
        }
      },
    },
  },
  mounted() {
    this.setData()
    this.updateTooltip()
    this.value = `${this.dataLabel} ${this.data[this.data.length - 1].value}`
    this.date = this.dateToString(this.data[this.data.length - 1].time)
  },
  methods: {
    setData() {
      this.lineChart.setData(this.data)
    },
    updateData(data) {
      this.lineChart.update(data)
    },
    dateToString(date) {
      const month = date.month > 10 ? date.month : `0${date.month}`
      return `${date.year}-${month}-${date.day}`
    },
    updateTooltip() {
      const { LightWeightCharts } = this.$lwcCore()
      this.chart.subscribeCrosshairMove((param) => {
        const price = param.seriesPrices.get(this.lineChart)
        if (param.time) {
          const dateStr = LightWeightCharts.isBusinessDay(param.time)
            ? this.dateToString(param.time)
            : new Date(param.time * 1000).toLocaleDateString()

          this.value = `${this.dataLabel} ${Math.round(price * 100) / 100}`
          this.date = dateStr
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1500px;
  position: relative;
}
.tooltip {
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  position: relative;
  padding: 6px;
  box-sizing: border-box;
  font-size: 32px;
  border-radius: 2px;
  background-color: var(--text-background);
  text-align: left;
  top: 60px;
  font-weight: bold;
  pointer-events: none;
  color: var(--text);
  .name {
    font-size: 24px;
    margin-top: 8px;
  }
  .value {
    font-size: 32px;
    display: flex;
    align-items: center;
    .date {
      font-size: 24px;
      margin-left: 16px;
    }
  }
}
@media (max-width: 1200px) {
  .tooltip {
    padding-left: 24px;
    font-size: 24px;
    .name {
      font-size: 16px;
    }
    .value {
      font-size: 24px;
      .date {
        font-size: 16px;
      }
    }
  }
}
</style>
