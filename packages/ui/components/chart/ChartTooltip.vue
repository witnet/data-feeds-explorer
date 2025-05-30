<template>
  <div class="tooltip-container">
    <div class="tooltip bg title">
      <div class="feed-title">
        <SvgIcon v-if="logo" class="icon" :svg="logo" />
        <h2 v-if="name" class="title feed-name">
          {{ name.toUpperCase() }}
        </h2>
      </div>
      <p class="text-small">
        {{ $t('chart.last_update') }}
      </p>
      <p class="value text">
        {{ lastResultValue }}
        <span class="time text-2-sm">{{ formattedTimestamp }}</span>
      </p>
      <p v-if="timeToUpdate" class="value-title">
        {{ $t('chart.status') }}
      </p>
      <DataFeedStatus
        v-if="timeToUpdate"
        :last-result-timestamp="lastResultTimestamp"
        :time-to-update="timeToUpdate"
      />
    </div>
    <InnerLink class="link" hash="integrate">
      <CustomButton class="btn" type="secondary">
        {{ $t('chart.use_data_feed') }}
      </CustomButton>
    </InnerLink>
  </div>
</template>

<script setup lang="ts">
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'
import type { localeCodes } from '~/types'
const { locale } = useI18n()

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  timeToUpdate: {
    type: Number,
    default: null,
  },
  lastResultValue: {
    type: String,
    default: '',
  },
  lastResultTimestamp: {
    type: String,
    default: '',
  },
})

const formattedTimestamp = computed(() =>
  calculateTimeAgo(props.lastResultTimestamp, locale.value as localeCodes),
)
</script>

<style scoped lang="scss">
.tooltip-container {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 16px;
  justify-content: space-between;
  margin-bottom: 24px;
}
.link {
  align-self: start;
}
.tooltip {
  transition: background-color 0.3s ease;
  .feed-title {
    display: flex;
    align-items: center;
    justify-items: center;
    margin-bottom: 8px;
    .icon {
      display: flex;
    }
    .feed-name {
      margin-left: 8px;
    }
  }

  .value {
    margin-bottom: 8px;
  }
}
@media screen and (max-width: 1100px) {
  .tooltip-container {
    padding: 0 24px;
  }
}
@media screen and (max-width: 300px) {
  .tooltip-container {
    padding: 0 16px;
  }
}
@media (max-width: 600px) {
  .tooltip-container {
    grid-template-columns: 1fr;
    margin-bottom: 32px;
  }
  .link {
    justify-self: flex-end;
    align-self: flex-end;
  }
}
</style>
