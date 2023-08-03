<template>
  <div class="container" @mouseout="hide()">
    <div
      v-if="showTooltip"
      class="tooltip"
      :style="{ top: valueTopPosition, left: valueLeftPosition }"
    >
      {{ value }}
    </div>
    <div :ref="label" class="value truncate" @mousemove="show()">
      {{ value }}
    </div>
    <div
      ref="copy"
      class="copy"
      @click="copy"
      @mousemove="showCopyTooltip = true"
      @mouseleave="showCopyTooltip = false"
    >
      <div
        v-if="copied"
        class="copy-tooltip"
        :style="{ top: copyTopPosition, left: copyLeftPosition }"
      >
        {{ $t('copied') }}
      </div>
      <div
        v-if="showCopyTooltip"
        class="copy-tooltip"
        :style="{ top: copyTopPosition, left: copyLeftPosition }"
      >
        {{ $t('copy') }}
      </div>
      <font-awesome-icon class="icon" icon="copy" />
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from '@/utils/copyToClipboard'

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showTooltip: false,
      showCopyTooltip: false,
      copied: false,
    }
  },
  computed: {
    valueTopPosition() {
      return `${this.$refs[this.label].offsetTop - 50}px`
    },
    valueLeftPosition() {
      return `${this.$refs[this.label].offsetLeft + 10}px`
    },
    copyTopPosition() {
      return `${this.$refs.copy.offsetTop - 30}px`
    },
    copyLeftPosition() {
      return `${this.$refs.copy.offsetLeft + 10}px`
    },
  },
  methods: {
    copy() {
      this.showCopyTooltip = false
      copyToClipboard(this.value)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 500)
    },
    show() {
      this.showTooltip =
        this.$refs[this.label].offsetWidth < this.$refs[this.label].scrollWidth
    },
    hide() {
      this.showTooltip = false
    },
  },
}
</script>

<style lang="scss" scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0;
  margin-right: 8px;
}

.tooltip,
.copy-tooltip {
  position: absolute;
  display: inline-block;
  font-size: var(--text-size);
  padding: 8px;
  border-radius: 4px;
  background-color: var(--bg);
  color: var(--text);
}

.container {
  display: flex;
}

.copy {
  padding: 16px;
  margin: -16px;
  font-size: var(--text-size-small);
  cursor: pointer;
}
</style>
