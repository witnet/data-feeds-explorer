<template>
  <div v-if="!$apollo.loading" class="content">
    <div class="section-header">
      <nuxt-link class="back-to-list" :to="localePath('/')">
        <font-awesome-icon class="icon" icon="arrow-alt-circle-left" />
      </nuxt-link>
      <SvgIcon name="btcusd" />
      <p class="network" :class="feed.network">{{ network }}</p>
    </div>
    <Chart class="chart" :data="chartData" data-label="$" :name="feedName" />
    <Fieldset
      :title="$t('data_feed_details.contract_address')"
      class="contract-container"
    >
      <a
        :href="`https://rinkeby.etherscan.io/address/${feedAddress}#code`"
        target="_blank"
        class="contract-address"
      >
        {{ id }}
      </a>
    </Fieldset>
    <TransactionsList
      v-if="transactions"
      class="transactions"
      :transactions="transactions"
    />
  </div>
</template>

<script>
import feed from '@/apollo/queries/feed.gql'
import { formatTimestamp } from '@/utils/formatTimestamp'

export default {
  apollo: {
    feed: {
      prefetch: true,
      query: feed,
      variables() {
        return {
          id: this.id,
        }
      },
    },
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    feedName() {
      return this.feed.name.toUpperCase()
    },
    feedAddress() {
      return this.feed.address
    },
    network() {
      return this.feed.network.toUpperCase()
    },
    chartData() {
      if (this.feed.requests.length > 0) {
        return this.feed.requests.map((request) => {
          return {
            time: formatTimestamp(request.timestamp),
            value: request.result,
          }
        })
      } else {
        return [{ time: formatTimestamp('0'), value: 0 }]
      }
    },
    transactions() {
      if (this.feed.requests.length > 0) {
        return this.feed.requests.map((request) => {
          return {
            witnetLink: request.drTxHash,
            etherscanLink: request.address,
            data: {
              label: this.feed.label,
              value: request.result,
            },
            timestamp: request.timestamp,
          }
        })
      } else {
        return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template: max-content max-content max-content 1fr / 1fr;
  row-gap: 16px;
  .contract-container {
    margin-top: 150px;
    .contract-address {
      word-break: break-all;
      font-size: 24px;
      padding: 24px;
      display: block;
      cursor: pointer;
      color: var(--contract-address);
    }
  }
  .chart {
    height: 400px;
  }
  .section-header {
    display: grid;
    grid-template: 1fr / 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    margin-top: 16px;
    width: 100%;
    .network {
      font-size: 16px;
      justify-self: flex-end;
      font-weight: bold;
      &.mainnet {
        color: var(--mainnet-network-color);
      }
      &.rinkeby {
        color: var(--rinkeby-network-color);
      }
      &.goerli {
        color: var(--goerli-network-color);
      }
      &.kovan {
        color: var(--kovan-network-color);
      }
    }
    .back-to-list {
      justify-self: flex-start;
      .icon {
        font-size: 24px;
        color: var(--text);
      }
      &:hover {
        .icon {
          color: var(--text-hover);
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .content {
    .section-header {
      .back-to-list {
        margin-left: 16px;
      }
      .network {
        margin-right: 16px;
      }
    }
  }
}
</style>
