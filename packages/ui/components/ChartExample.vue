<template>
  <div ref="container">
    <div
      v-show="tooltip"
      class="tooltip"
      :style="{ left: `${tooltipLeftPosition}px` }"
    >
      {{ tooltipContent }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tooltip: true,
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ],
      width: 400,
      height: 300,
      tooltipContent: '',
      toolTipWidth: 100,
      tooltipLeftPosition: 10,
    }
  },
  computed: {
    chart() {
      const { LightWeightCharts } = this.$lwcCore()
      return LightWeightCharts.createChart(this.$refs.container, {
        width: 400,
        height: 300,
        leftPriceScale: {
          visible: false,
        },
        timeScale: {
          visible: false,
        },
        crosshair: {
          horzLine: {
            visible: false,
          },
          vertLine: {
            visible: false,
          },
        },
        rightPriceScale: {
          scaleMargins: {
            top: 0.5,
            bottom: 0.5,
          },
          visible: false,
          borderVisible: false,
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
        topColor: 'rgba(38,198,218, 0.56)',
        bottomColor: 'rgba(38,198,218, 0.04)',
        lineColor: 'rgba(38,198,218, 1)',
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
    setTimeout(() => {
      this.data = [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
        { time: '2019-04-21', value: 5.43 },
        { time: '2019-04-22', value: 6.43 },
        { time: '2019-04-23', value: 7.43 },
        { time: '2019-04-24', value: 8.43 },
        { time: '2019-04-25', value: 9.43 },
      ]
    }, 10000)
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
        if (
          !param.time ||
          param.point.x < 0 ||
          param.point.x > this.width ||
          param.point.y < 0 ||
          param.point.y > this.height
        ) {
          this.tooltip = false
          return
        }

        this.tooltip = true
        const price = param.seriesPrices.get(this.lineChart)
        const dateStr = LightWeightCharts.isBusinessDay(param.time)
          ? this.dateToString(param.time)
          : new Date(param.time * 1000).toLocaleDateString()

        this.tooltipContent =
          '' + Math.round(price * 100) / 100 + ' | ' + dateStr

        const leftPosition = param.point.x - this.toolTipWidth / 2
        this.tooltipLeftPosition = Math.max(
          0,
          Math.min(this.width - this.toolTipWidth, leftPosition)
        )
      })
    },
  },
}
</script>

<style lang="scss">
.container {
  position: relative;
}
.tooltip {
  width: max-content;
  height: max-content;
  position: relative;
  padding: 6px;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 2px;
  background-color: var(--text-background);
  text-align: center;
  z-index: 1000;
  top: 3px;
  pointer-events: none;
  color: var(--text);
}
</style>
