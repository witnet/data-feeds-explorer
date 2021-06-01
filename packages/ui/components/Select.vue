<template>
  <vSelect
    v-model="selected"
    :clearable="false"
    :filterable="false"
    :options="options"
    :searchable="false"
    class="selector"
    placeholder="Choose an option"
  >
    <template #selected-option-container="{ option }">
      <span class="vs__selected">{{ option.label }}</span>
    </template>

    <template #option="option">
      <span>{{ option.label }}</span>
    </template>
  </vSelect>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    defaultOption: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: this.defaultOption,
    }
  },
  watch: {
    selected: {
      handler(selected) {
        this.$emit('update-selected', selected)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.selector {
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    width: max-content;
    padding: 0;
    background: var(--selected-background);
    border: var(--selected-border);
    border-radius: 4px;
    box-shadow: none;
    color: var(--selected-text);
    min-width: max-content;
    font-size: 1rem;
    font-weight: 600;
  }
  .vs__open-indicator {
    font-size: 13px;
    color: var(--selected-icon);
  }
  .vs__dropdown-menu {
    background: var(--selected-options-background);
    top: 50px;
    border: var(--selected-options-border);
    box-shadow: var(--selected-options-shadow);
    border-radius: 4px 4px 4px 4px;
  }

  .vs__dropdown-option {
    font-family: Almarai, sans-serif;
    font-size: 1rem;
    padding: 12px;
    font-weight: 600;
    color: var(--selected-options-text);
  }

  .vs__dropdown-option--highlight {
    background: var(--selected-options-highlight);
  }

  .vs--single.vs--open.vs__dropdown-toggle {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-color: black;
  }

  .vs__clear,
  .vs__open-indicator {
    color: var(--selected-icon);
  }

  .image {
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .vs__selected {
    height: 40px;
    color: var(--selected-text);
    font-family: Almarai, sans-serif;
    font-weight: 600;
    margin: 0;
    padding: 0 0 0 8px;
  }
  &:hover {
    .vs__selected {
      color: var(--selected-text);
    }
    .vs__open-indicator {
      color: var(--selected-icon);
    }
  }
  .vs__actions {
    padding: 8px;
  }
  // remove extra space
  .vs__search {
    padding: 0 !important;
  }
}
// avoid decrease size on open
.vs--single.vs--open .vs__selected {
  opacity: 1 !important;
  position: inherit !important;
}
</style>
