<template>
  <div ref="container">
    <div v-show="tooltip" class="tooltip">
      <span class="value">
        {{ formatNumber(value) }} <span class="date"> {{ date }}</span></span
      >
      <span class="name"> {{ name }} </span>
    </div>
    <div class="switcher">
      <div
        v-for="(serie, index) in seriesData"
        :key="serie[0]"
        class="item"
        :class="{ active: serie[0] === activeItem }"
        @click="onItemClicked(index)"
      >
        {{ $t(`${serie[0]}`) }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'
import { getRangeData } from '@/utils/getRangeData'
import { CHART_UNITS } from '@/constants'

export default {
  name: 'Chart',
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
      value: '',
      date: '',
      toolTipWidth: 100,
      tooltipLeftPosition: 10,
      activeItem: 'd',
    }
  },
  computed: {
    seriesData() {
      return [
        ['d', this.data],
        ['w', getRangeData(this.data, CHART_UNITS.week)],
        ['m', getRangeData(this.data, CHART_UNITS.month)],
        ['y', getRangeData(this.data, CHART_UNITS.year)],
      ]
    },
    chart() {
      const { LightWeightCharts } = this.$lwcCore()
      return LightWeightCharts.createChart(this.$refs.container, {
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
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
        priceFormat: { type: 'price', minMove: 0.001, precision: 3 },
      })
    },
    lineChart() {
      this.chart.timeScale().fitContent()
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
        this.chart.timeScale().fitContent()
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
    formatNumber,
    setData() {
      this.lineChart.setData(this.data)
    },
    onItemClicked(index) {
      this.activeItem = this.seriesData[index][0]
      this.lineChart.setData(this.seriesData[index][1])
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
          this.value = `${this.dataLabel} ${Math.round(price * 1000) / 1000}`
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

.switcher {
  display: grid;
  grid-gap: 8px;
  grid-template: 1fr / repeat(4, max-content);
  margin-right: 16px;
  justify-content: flex-end;
  margin-bottom: 32px;
  .item {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: transparent;
    color: var(--switcher-item-color);
  }
  .active {
    background-color: var(--switcher-item-background);
  }
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
