<template>
  <div class="sidebar">
    <div
      v-for="option in sidebarOptions"
      :key="option"
      class="option"
      @click="selectOption(option)"
    >
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    defaultOption: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: this.defaultOption,
    }
  },
  computed: {
    sidebarOptions() {
      console.log('---options---', Object.keys(this.options))
      return Object.keys(this.options)
    },
  },
  watch: {
    selected: {
      handler(selected) {
        this.$emit('update-selected', selected)
      },
      deep: true,
    },
  },
  methods: {
    selectOption(option) {
      this.selected = this.options[option]
      console.log(this.selected)
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  position: relative;
  text-align: right;
  .option {
    background: var(--tab-gradient);
    padding: 16px 16px 16px 0;
    cursor: pointer;
  }
  .selected {
    background: var(--tab-gradient-selected);
  }
}
</style>
