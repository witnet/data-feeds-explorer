<template>
  <div class="content">
    <Chart
      v-if="feed"
      class="chart"
      :data="chartData"
      :last-result-timestamp="transactions ? transactions[0].timestamp : ''"
      :data-label="feed.label"
      :name="feedName"
      :decimals="feedDecimals"
      @change-range="updateQuery"
    />
    <p class="feed-description">
      This is a Witnet powered <span class="bold">{{ feedName }}</span> data
      feed available on <span class="bold">{{ network }}</span
      >. Last reported value is <span class="bold">{{ lastResultvalue }}</span
      >(updated on <span class="bold">{{ lastResultDate }}</span
      >). This price feed is updated every
      <span class="bold">{{ feedTimeToUpdate }}</span
      >, or every time the price changes by more than
      <span class="bold">{{ deviation }}%</span>.
    </p>
    <Fieldset :title="$t('data_feed_details.trigger_parameters')">
      <div class="info-container">
        <div class="item">
          <InfoTooltip
            :label="$t('chart.deviation')"
            :value="$t('chart.deviation_text')"
          />
          <div>{{ deviation }}%</div>
        </div>
        <div class="item">
          <InfoTooltip
            :label="$t('chart.heartbeat')"
            :value="$t('chart.heartbeat_text')"
          />
          <Heartbeat
            class="countdown"
            :milliseconds="maxTimeToResolve"
            :last-result-timestamp="
              transactions ? transactions[0].timestamp : ''
            "
          />
        </div>
      </div>
    </Fieldset>
    <Fieldset :title="$t('data_feed_details.contract_address')">
      <div class="integration-details">
        <div class="left">
          <p class="title-details">
            Witnet price feeds can be integrated into your own
            {{ network }} contracts in two different ways:
          </p>
          <div class="bottom">
            <Button class="btn">Integrate through proxy</Button>
            <Button class="btn">Integrate directly</Button>
            <p class="subtitle">Recommended for testing and upgradability</p>
            <p class="subtitle">Optimized for gas cost and decentralization</p>
          </div>
        </div>
        <div class="right">
          <p>contract address</p>
          <a :href="url" target="_blank" class="contract-address">
            {{ feedAddress }}
            <font-awesome-icon class="icon" icon="external-link-alt" />
          </a>
          <p>proxy address</p>
          <a :href="url" target="_blank" class="contract-address">
            {{ proxyAddress }}
            <font-awesome-icon class="icon" icon="external-link-alt" />
          </a>
        </div>
      </div>
    </Fieldset>
    <TransactionsList
      v-if="transactions"
      class="transactions"
      :transactions="transactions"
    />
    <el-pagination
      v-if="feed && numberOfPages > 1"
      :small="small"
      class="pagination"
      layout="prev, pager, next"
      :pager-count="5"
      :page-count="numberOfPages"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import feed from '@/apollo/queries/feed.gql'
import requests from '@/apollo/queries/requests.gql'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'
import { CHART_RANGE } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { formatNumber } from '@/utils/formatNumber'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'
import { formatSvgName } from '@/utils/formatSvgName'
import { capitalizeFirstLetter } from '../utils/generateSelectOptions'

export default {
  apollo: {
    feed: {
      prefetch: true,
      query: feed,
      variables() {
        return {
          timestamp: this.timestamp,
          feedFullName: this.feedFullName,
        }
      },
      pollInterval: 60000,
    },
    requests: {
      prefetch: true,
      query: requests,
      variables() {
        return {
          feedFullName: this.feedFullName,
          page: this.currentPage,
          size: this.itemsPerPage,
        }
      },
      pollInterval: 60000,
    },
  },
  data() {
    return {
      ranges: CHART_RANGE,
      currentPage: 1,
      itemsPerPage: 25,
      range: 24,
      timestamp: getTimestampByRange(CHART_RANGE.w.value),
      feedFullName: this.$route.params.id,
    }
  },
  computed: {
    small() {
      return this.numberOfPages > 10
    },
    svgIcon() {
      return this.feed ? formatSvgName(this.feed.name) : ''
    },
    url() {
      return this.feed
        ? this.feed.blockExplorer.replace(`{address}`, this.feedAddress)
        : ''
    },
    deviation() {
      return this.feed ? this.feed.deviation : ''
    },
    network() {
      return this.feed
        ? this.feed.network.split('-').map(capitalizeFirstLetter).join(' ')
        : ''
    },
    lastResultDate() {
      if (this.transactions) {
        return formatTimestamp(this.transactions[0].timestamp)
      } else {
        return ''
      }
    },
    lastResultTime() {
      if (this.transactions) {
        return formatTimestamp(this.transactions[0].timestamp)
      } else {
        return ''
      }
    },
    feedTimeToUpdate() {
      if (this.feed) {
        return formatMilliseconds(
          Number(this.feed.heartbeat) + Number(this.feed.finality)
        )
      } else {
        return ''
      }
    },
    lastResultvalue() {
      if (this.transactions) {
        return `${this.transactions[0].data.label} ${formatNumber(
          parseFloat(this.transactions[0].data.value) /
            10 ** this.transactions[0].data.decimals
        )} `
      } else {
        return null
      }
    },
    maxTimeToResolve() {
      return this.feed
        ? (Number(this.feed.heartbeat) + Number(this.feed.finality)).toString()
        : ''
    },
    numberOfPages() {
      return this.feed
        ? Math.ceil(this.feed.requests.length / this.itemsPerPage)
        : 0
    },
    feedName() {
      return this.feed ? this.feed.name.toUpperCase() : ''
    },
    feedAddress() {
      console.log(this.feed)
      return this.feed ? this.feed.address : ''
    },
    proxyAddress() {
      console.log(this.feed)
      return this.feed ? this.feed.proxyAddress : ''
    },
    feedDecimals() {
      return this.feed ? this.feed.feedFullName.split('_').pop() || 3 : 3
    },
    chartData() {
      if (this.feed && this.feed.requests.length > 0) {
        return this.feed.requests
          .map((request) => {
            return {
              time: Number(request.timestamp),
              value: parseFloat(request.result) / 10 ** this.feedDecimals,
            }
          })
          .sort((t1, t2) => t1.time - t2.time)
      } else {
        return [{ time: 0, value: 0 }]
      }
    },
    transactions() {
      if (this.feed && this.requests && this.requests.length > 0) {
        return this.requests.map((request) => ({
          witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
          drTxHash: request.drTxHash,
          data: {
            label: this.feed.label,
            value: request.result,
            decimals: this.feedDecimals,
          },
          timestamp: request.timestamp,
        }))
      } else {
        return null
      }
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    updateQuery(val) {
      this.timestamp = getTimestampByRange(this.ranges[val].value)
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template: max-content max-content max-content max-content 1fr / 1fr;
  .feed-description {
    font-size: 14px;
    padding: 16px;
  }
  .info-container {
    padding: 16px;
    display: grid;
    grid-template-rows: max-content;
    row-gap: 16px;
    .item {
      display: grid;
      grid-template-columns: max-content max-content;
      font-weight: bold;
      column-gap: 8px;
    }
    .contract-address {
      display: flex;
      align-items: center;
      line-break: loose;
      word-break: break-all;
      font-size: 24px;
      cursor: pointer;
      color: var(--contract-address);
      .icon {
        margin-left: 16px;
      }
    }
  }
  .integration-details {
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    .left {
      text-align: center;
      border-right: 1px solid var(--bg);
      padding-right: 16px;
      .title-details {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 16px;
      }
      .bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
        grid-template-rows: max-content max-content;
        .btn {
          height: max-content;
        }
      }
    }
  }
  .pagination {
    padding-bottom: 72px;
    justify-self: center;
  }
  .chart {
    margin-top: 24px;
  }
  .section-header {
    display: grid;
    grid-template: 1fr / repeat(3, 1fr);
    justify-items: center;
    align-items: flex-end;
    margin-top: 16px;
    width: 100%;
    .network-details {
      justify-self: flex-end;
    }
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      .feed-name {
        font-weight: 600;
        margin-top: 8px;
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
      grid-template: 1fr 1fr / max-content 1fr;
      justify-items: flex-end;
      .back-to-list {
        margin-left: 16px;
      }
      .title {
        margin-right: 16px;
      }
      .networks {
        grid-column: 1 / span 2;
        margin-right: 16px;
      }
    }
    .chart {
      margin-top: 0;
    }
  }
}
</style>
