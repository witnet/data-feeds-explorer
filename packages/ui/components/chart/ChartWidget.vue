<template>
  <div>
    <ChartTooltip
      :name="name"
      :logo="logo"
      :last-result-value="lastResultValue"
      :last-result-timestamp="lastResultTimestamp"
      :time-to-update="timeToUpdate"
    />
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
    <div ref="container">
      <ChartMovingTooltip
        v-if="top && left"
        :value="value"
        :date="date"
        :style="{
          top: `${top}px`,
          left: `${left}px`,
          width: `${toolTipWidth}px`,
          height: `${toolTipHeight}px`,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ColorType,
  createChart,
  PriceScaleMode,
  type AreaData,
  type Time,
} from 'lightweight-charts'
import { type PropType } from 'vue'
import { formatNumber } from '@/utils/formatNumber'
import { CHART_RANGE } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'

const props = defineProps({
  data: {
    type: Array as PropType<AreaData<Time>[]>,
    required: true,
  },
  logo: {
    type: String,
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
  timeToUpdate: {
    type: Number,
    default: null,
  },
  decimals: {
    type: String,
    required: true,
  },
  lastResultValue: {
    type: String,
    required: true,
  },
  lastResultTimestamp: {
    type: String,
    required: true,
  },
})

// const tooltip: Ref<boolean> = ref(true)
// const dateTooltip: Ref<boolean> = ref(true)
const value: Ref<string> = ref('')
const date: Ref<string> = ref('')
const left: Ref<number | null> = ref(null)
const top: Ref<number | null> = ref(null)
const toolTipWidth: Ref<number> = ref(150)
const toolTipHeight: Ref<number> = ref(60)
// const tooltipLeftPosition: Ref<number> = ref(10)
const ranges: Ref<any> = ref(CHART_RANGE)
const container = ref()
const currentRange = ref(
  (process.browser ? localStorage.getItem('range') : '')?.toString(),
)
const range = computed({
  get(): string | undefined {
    return currentRange.value
  },
  set(value: string | undefined) {
    if (value) {
      localStorage.setItem('range', value)
      currentRange.value = value
    }
  },
})

const activeItem = computed(() => {
  return range.value || ranges.value.w.key
})
const chart = computed(() => {
  return createChart(container.value, {
    height: 400,
    rightPriceScale: {
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
      mode: PriceScaleMode.Logarithmic,
      borderVisible: false,
    },
    timeScale: {
      borderVisible: false,
    },
    crosshair: {
      horzLine: {
        visible: true,
      },
      vertLine: {
        visible: true,
      },
    },
    layout: {
      background: { type: ColorType.Solid, color: 'transparent' },
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
})

const lineChart = computed(() => {
  chart.value.timeScale().fitContent()

  return chart.value.addAreaSeries({
    topColor: '#41BEA556',
    bottomColor: '#41BEA504',
    lineColor: '#41BEA5',
    lineWidth: 2,
    priceFormat: { type: 'price', minMove: 0.001, precision: 3 },
  })
})

const emit = defineEmits(['change-range'])

watch(
  () => props.data,
  () => {
    setData()
    updateTooltip()
    chart.value.timeScale().fitContent()
  },
  { deep: true },
)

onMounted(() => {
  setData()
  updateTooltip()
  emit('change-range', activeItem.value)
})

const setData = () => {
  lineChart.value.setData(props.data as AreaData<Time>[])
}
const onItemClicked = (currentRange: any) => {
  if (process.browser) {
    range.value = currentRange
  }
  emit('change-range', currentRange)
}
// FIXME: delete if unncessary
// const updateData = (data: any) => {
//   lineChart.value.update(data)
// }
const dateToString = (date: any) => {
  return formatTimestamp(date)
}
const updateTooltip = () => {
  value.value = `${props.dataLabel} ${props.data[props.data.length - 1].value}`
  date.value = dateToString(props.data[props.data.length - 1].time)
  chart.value.subscribeCrosshairMove((param) => {
    const price = param.seriesData.get(lineChart.value) as {
      time: number
      value: number
    }
    if (param.time) {
      const dateStr = dateToString(param.time)
      value.value = `${props.dataLabel} ${formatNumber((price.value ?? '0').toString())}`
      date.value = dateStr
    }
    const toolTipMargin = 24
    const width = container.value.getBoundingClientRect().width
    const height = 400
    const y = param.point ? param.point.y : null
    const x = param.point ? param.point.x : null

    left.value = x
    if (left.value && x && left.value > width - toolTipWidth.value) {
      left.value = x - toolTipMargin - toolTipWidth.value
    }

    top.value = y
    if (top.value && y && top.value > height - toolTipHeight.value) {
      top.value = y - toolTipHeight.value - toolTipMargin
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1500px;
  position: relative;
}
.tv-lightweight-charts {
  height: 500px;
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
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.8;
    }
  }
  .active {
    background-color: var(--switcher-item-background);
  }
}
@media (max-width: 850px) {
  .tooltip {
    padding-left: 24px;
    font-size: var(--text-size-title);
    .name {
      font-size: var(--text-size);
    }
    .value {
      font-size: var(--text-size-title);
      .date {
        font-size: var(--text-size);
      }
    }
  }
}
</style>
