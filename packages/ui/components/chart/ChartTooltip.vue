<template>
  <div class="tooltip-container">
    <div class="tooltip">
      <div class="feed-title">
        <SvgIcon v-if="logo" class="icon" :svg="logo" />
        <h2 v-if="name" class="title feed-name">
          {{ name.toUpperCase() }}
        </h2>
      </div>
      <p class="value-title">
        {{ $t('chart.last_update') }}
      </p>
      <p class="value">
        {{ lastResultValue }}
        <span class="time">{{ formattedTimestamp }}</span>
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
      <Button class="btn" type="secondary">
        {{ $t('chart.use_data_feed') }}
      </Button>
    </InnerLink>
  </div>
</template>

<script>
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'

export default {
  props: {
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
  },
  computed: {
    formattedTimestamp() {
      return calculateTimeAgo(this.lastResultTimestamp, this.$i18n.locale)
    },
  },
}
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
  font-weight: bold;
  font-size: var(--text-size-title);
  background-color: var(--bg);
  transition: background-color 0.3s ease;
  color: var(--text);

  .feed-title {
    display: flex;
    align-items: center;
    justify-items: center;
    margin-bottom: 8px;

    .icon {
      display: flex;
    }

    .feed-name {
      font-size: var(--text-size-title);
      margin-left: 8px;
    }
  }

  .item {
    font-size: var(--text-size);
    margin-top: 8px;
    color: var(--text-medium-emphasis);
    display: flex;

    .title {
      font-size: var(--text-size);
      margin-right: 10px;
      color: var(--text-hover);
    }
  }

  .value-title {
    font-size: var(--text-size-small);
  }

  .value {
    font-size: var(--text-size);
    margin-bottom: 8px;

    .time {
      font-size: var(--text-size-small);
      color: var(--text-medium-emphasis);
    }
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
