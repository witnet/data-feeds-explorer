<template>
  <div id="integrate" class="integration-details">
    <div class="left">
      <p class="title-details">
        {{ $t('data_feed_details.integration_details_description', [network]) }}
      </p>
      <div class="bottom">
        <a :href="urls.integrateThroughProxy" target="_blank">
          <CustomButton class="btn">
            {{ $t('data_feed_details.integrate_proxy') }}</CustomButton
          >
        </a>
        <a :href="urls.integrateDirectly" target="_blank">
          <CustomButton class="btn">
            {{ $t('data_feed_details.integrate_directly') }}</CustomButton
          >
        </a>
        <p class="subtitle testing">
          {{ $t('data_feed_details.recommended_for_testing') }}
        </p>
        <p class="subtitle optimized">
          {{ $t('data_feed_details.optimized_for_gas_cost') }}
        </p>
      </div>
    </div>
    <div class="right">
      <p class="title-address">
        {{ $t('data_feed_details.proxy_address').toUpperCase() }}
      </p>
      <a :href="urlProxyContract" target="_blank" class="contract-info">
        {{ proxyAddress }}
        <font-awesome-icon class="icon" icon="external-link-alt" />
      </a>
      <p class="title-address">
        {{ $t('data_feed_details.underlying_feed_contract').toUpperCase() }}
      </p>
      <a :href="urlUnderlyingContract" target="_blank" class="contract-info">
        {{ feedAddress }}
        <font-awesome-icon class="icon" icon="external-link-alt" />
      </a>
      <p class="title-address">
        {{ $t('data_feed_details.erc2362_asset_id').toUpperCase() }}
      </p>
      <p target="_blank" class="contract-id">
        {{ contractId }}
      </p>
    </div>
  </div>
</template>

<script>
import { urls } from '../constants'
export default {
  props: {
    network: {
      type: String,
      required: true,
    },
    proxyAddress: {
      type: String,
      required: true,
    },
    feedAddress: {
      type: String,
      required: true,
    },
    contractId: {
      type: String,
      required: true,
    },
    urlUnderlyingContract: {
      type: String,
      required: true,
    },
    urlProxyContract: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      urls,
    }
  },
}
</script>

<style lang="scss" scoped>
.integration-details {
  padding: 16px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  .left {
    text-align: center;
    border-right: 1px solid var(--bg);
    padding-right: 16px;
    .title-details {
      font-size: var(--text-size);
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
  .right {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 8px;
    .title-address {
      font-size: var(--text-size-medium);
      font-weight: bold;
      margin-top: 8px;
    }
    .contract-id {
      font-size: var(--text-size);
      margin-bottom: 8px;
      font-family:
        Roboto Mono,
        monospace;
      word-break: break-all;
      max-width: 400px;
    }
    .contract-info {
      font-family:
        Roboto Mono,
        monospace;
      color: var(--text-hover);
      font-size: var(--text-size);
      word-break: break-all;
      margin-bottom: 8px;
      cursor: pointer;
    }
    .icon {
      font-size: 10px;
      width: 10px;
      height: 10px;
    }
  }
}
@media (max-width: 850px) {
  .integration-details {
    grid-template-columns: 1fr;
    grid-gap: 16px;
    .right {
      border-right: none;
    }
    .left {
      border-right: none;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--bg);
      .testing {
        grid-row: 2;
      }
      .bottom {
        display: grid;
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
