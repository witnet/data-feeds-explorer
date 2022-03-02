<template>
  <div class="content">
    <Chart
      v-if="feed"
      class="chart"
      :data="chartData"
      :last-result-timestamp="transactions ? transactions[0].timestamp : ''"
      :last-result-value="lastResultvalue"
      :data-label="feed.label"
      :name="feedName"
      :time-to-update="maxTimeToResolve"
      :decimals="feedDecimals"
      @change-range="updateQuery"
    />
    <i18n
      path="data_feed_details.feed_description"
      tag="p"
      class="feed-description"
    >
      <template #name>
        <span class="bold">{{ feedName }}</span>
      </template>
      <template #network>
        <span class="bold">{{ network }}</span>
      </template>
      <template #value>
        <span class="bold">{{ lastResultvalue }}</span>
      </template>
      <template #date>
        <span class="bold">{{ lastResultDate }}</span>
      </template>
      <template #heartbeat>
        <span class="bold">{{ feedTimeToUpdate }}</span>
      </template>
      <template #deviation>
        <span class="bold">{{ deviation }}%</span>
      </template>
    </i18n>
    <Fieldset :title="$t('data_feed_details.trigger_parameters')">
      <div class="info-container">
        <div class="item">
          <InfoTooltip :value="$t('chart.deviation_text')">
            <p>{{ $t('chart.deviation') }}</p>
          </InfoTooltip>
          <div class="value">{{ deviation }}%</div>
        </div>
        <div class="item">
          <InfoTooltip :value="$t('chart.heartbeat_text')">
            <p>{{ $t('chart.heartbeat') }}</p>
          </InfoTooltip>
          <Heartbeat
            class="value"
            :milliseconds="maxTimeToResolve"
            :last-result-timestamp="
              transactions ? transactions[0].timestamp : ''
            "
          />
        </div>
      </div>
    </Fieldset>
    <Fieldset :title="$t('data_feed_details.contract_address')">
      <IntegrationDetails
        :network="network"
        :proxy-address="proxyAddress"
        :feed-address="feedAddress"
        :contract-id="contractId"
        :url-underlying-contract="urlUnderlyingContract"
        :url-proxy-contract="urlProxyContract"
      />
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
    urlUnderlyingContract() {
      return this.feed
        ? this.feed.blockExplorer.replace(`{address}`, this.feedAddress)
        : ''
    },
    urlProxyContract() {
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
    heartbeat() {
      if (this.feed) {
        return Number(this.feed.heartbeat)
      } else {
        return 0
      }
    },
    finality() {
      if (this.feed) {
        return Number(this.feed.finality)
      } else {
        return 0
      }
    },
    feedTimeToUpdate() {
      if (this.feed) {
        return formatMilliseconds(this.heartbeat + this.finality)
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
      return this.heartbeat + this.finality
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
      return this.feed ? this.feed.address : ''
    },
    proxyAddress() {
      return this.feed ? this.feed.proxyAddress : ''
    },
    contractId() {
      return this.feed ? this.feed.contractId : ''
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
    font-size: var(--text-size);
    padding: 16px;
    margin-top: 16px;
  }
  .info-container {
    padding: 16px;
    display: grid;
    grid-template-rows: max-content;
    row-gap: 16px;
    .item {
      display: flex;
      flex-wrap: wrap;
      grid-gap: 8px;
      font-weight: bold;
      column-gap: 8px;
      .value {
        display: flex;
        align-items: center;
      }
    }
    .contract-address {
      display: flex;
      align-items: center;
      line-break: loose;
      word-break: break-all;
      font-size: var(--text-size-title);
      cursor: pointer;
      color: var(--contract-address);
      .icon {
        margin-left: 16px;
      }
    }
  }
  .pagination {
    padding-bottom: 16px;
    justify-self: center;
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
        font-size: var(--text-size-title);
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
@media (max-width: 850px) {
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
