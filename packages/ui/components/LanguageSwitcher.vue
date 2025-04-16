<template>
  <client-only>
    <vSelect
      v-if="locale"
      :model-value="locale"
      :options="languageCodes"
      :clearable="false"
      :filterable="false"
      :searchable="false"
      :components="{ OpenIndicator: OpenIcon }"
      class="language-selector"
      @update:model-value="setLocale"
    >
      <template #selected-option-container="{ option }">
        <span class="vs__selected">
          <span>{{ LANGUAGE_LOCALES[(option as Option).label].name }}</span>
        </span>
      </template>

      <template #option="option">
        <div class="option">
          <span>{{ LANGUAGE_LOCALES[(option as Option).label].name }}</span>
        </div>
      </template>
    </vSelect>
  </client-only>
</template>
<script setup lang="ts">
import vSelect from 'vue-select'
import { LANGUAGE_LOCALES } from '@/constants'
import { localeCodes, type Locale } from '@/types'
import OpenIcon from '@/components/OpenIndicator.vue'
import 'vue-select/dist/vue-select.css'

const { locale, setLocale } = useI18n({ useScope: 'global' })

type Option = {
  label: localeCodes
}

const languageCodes: ComputedRef<Array<Locale>> = computed(() => {
  return Object.values(LANGUAGE_LOCALES).map((locale) => locale.code)
})
</script>

<style lang="scss">
@use '~/assets/styles/colors.scss' as *;

.language-selector {
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    background: transparent;
    border: none;
    border-bottom: 1px solid $white;
    box-shadow: none;
    border-radius: 0;
    color: $white;
    min-width: max-content;
    font-size: 16px;
  }
  .vs__open-indicator {
    font-size: 8px;
  }
  .vs__dropdown-menu {
    background: $white;
    top: -80px;
    border: 2px solid $white;
  }

  .vs__dropdown-option {
    font-family: 'NeueMachina-Regular', sans-serif;
    font-size: 16px;
    color: $black;
  }

  .vs__dropdown-option--highlight {
    color: $white;
    background: $black;
  }

  .vs__clear,
  .vs__open-indicator {
    fill: $white;
  }

  .image {
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .vs__selected {
    color: $white;
    font-family: 'NeueMachina-Regular', sans-serif;
    margin: 0;
    padding: 4px 0 0 0;
    font-size: 16px;
  }
  &:hover {
    .vs__selected {
      color: $white;
    }
    .vs__open-indicator {
      color: $white;
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
