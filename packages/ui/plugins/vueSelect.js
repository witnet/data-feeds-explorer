import Vue from 'vue'
import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css'

vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: (createElement) => createElement('span', '▼'),
  },
})

Vue.component('VSelect', vSelect)
