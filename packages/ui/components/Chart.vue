<template>
  <div ref="container">
    <div v-show="tooltip" class="tooltip">
      <span class="value">{{ formatNumber(value) }}</span>
      <span class="date"> {{ date }}</span>
    </div>
    <div class="switcher">
      <div
        v-for="serie in ranges"
        :key="serie.key"
        class="item"
        :class="{ active: serie.key === activeItem }"
        @click="onItemClicked(serie.key)"
      >
        {{ $t(`chart.${serie.key}`) }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'
import { CHART_RANGE } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'

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
    decimals: {
      type: Number,
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
      ranges: CHART_RANGE,
      get range() {
        return process.browser ? localStorage.getItem('range') : ''
      },
      set range(value) {
        return process.browser ? localStorage.setItem('range', value) : value
      },
    }
  },
  computed: {
    activeItem() {
      return this.range || this.ranges.w.key
    },
    chart() {
      const { LightWeightCharts } = this.$lwcCore()
      return LightWeightCharts.createChart(this.$refs.container, {
        rightPriceScale: {
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
          mode: LightWeightCharts.PriceScaleMode.Logarithmic,
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
      handler() {
        this.setData()
        this.updateTooltip()
        this.chart.timeScale().fitContent()
      },
    },
  },
  mounted() {
    this.setData()
    this.updateTooltip()
    this.$emit('change-range', this.activeItem)
  },
  methods: {
    formatNumber,
    setData() {
      this.lineChart.setData(this.data)
    },
    onItemClicked(currentRange) {
      if (process.browser) {
        this.range = currentRange
      }
      this.$emit('change-range', currentRange)
    },
    updateData(data) {
      this.lineChart.update(data)
    },
    dateToString(date) {
      return formatTimestamp(date)
    },
    updateTooltip() {
      this.value = `${this.dataLabel} ${this.data[this.data.length - 1].value}`
      this.date = this.dateToString(this.data[this.data.length - 1].time)
      this.chart.subscribeCrosshairMove((param) => {
        const price = param.seriesPrices.get(this.lineChart)
        if (param.time) {
          const dateStr = this.dateToString(param.time)
          this.value = `${this.dataLabel} ${
            Math.round(price * 10 ** this.decimals) / 10 ** this.decimals
          }`
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
  top: 0;
  font-weight: bold;
  pointer-events: none;
  color: var(--text);
  .date {
    font-size: 16px;
    margin-top: 8px;
    color: var(--text-medium-emphasis);
  }
  .value {
    font-size: 32px;
    display: flex;
    align-items: center;
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
