import Vue from 'vue'
import * as LightWeightCharts from 'lightweight-charts'

Vue.prototype.$lwcCore = () => {
  return {
    LightWeightCharts,
  }
}
