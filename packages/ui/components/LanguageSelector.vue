<template>
  <vSelect
    v-model="selected"
    :clearable="false"
    :filterable="false"
    :options="options"
    :searchable="false"
    class="language-selector"
    placeholder="Choose a Styling Option"
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
import { findLanguage } from '@/utils/findLanguage'
import { getExpandedLanguages } from '@/utils/getExpandedLanguages'
import { languages } from '@/constants'

export default {
  data() {
    return {
      selected: findLanguage(this.$route.path),
      options: getExpandedLanguages(languages),
    }
  },
  watch: {
    selected: {
      handler(selected) {
        this.$i18n.setLocale(selected.code)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.language-selector {
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    background: transparent;
    border: none;
    border-bottom: 1px solid white;
    box-shadow: none;
    border-radius: 0;
    color: white;
    min-width: max-content;
    font-size: 16px;
  }
  .vs__open-indicator {
    font-size: 8px;
  }
  .vs__dropdown-menu {
    background: white;
    top: -80px;
    border: 2px solid white;
  }

  .vs__dropdown-option {
    font-family: 'NeueMachina-Regular', sans-serif;
    font-size: 16px;
    color: var(--language-selector-bg);
  }

  .vs__dropdown-option--highlight {
    color: white;
    background: var(--language-selector-bg);
  }

  .vs__clear,
  .vs__open-indicator {
    fill: var(--language-selector-bg);
  }

  .image {
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .vs__selected {
    color: white;
    font-family: 'NeueMachina-Regular', sans-serif;
    margin: 0;
    padding: 4px 0 0 0;
    font-size: 16px;
  }
  &:hover {
    .vs__selected {
      color: white;
    }
    .vs__open-indicator {
      color: white;
    }
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
