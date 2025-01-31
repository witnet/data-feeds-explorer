<template>
  <div id="integrate" class="integration-details">
    <div class="left">
      <p class="title-details text">
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
      <p v-if="isContractVersion2" class="title-address text-small-bold">
        {{ $t('data_feed_details.contract_address_title').toUpperCase() }}
      </p>
      <p v-else class="title-address text-small">
        {{ $t('data_feed_details.proxy_address').toUpperCase() }}
      </p>
      <a
        v-if="isContractVersion2"
        :href="urlProxyContract"
        target="_blank"
        class="contract-info text font-mono"
      >
        {{ proxyAddress }}
        <font-awesome-icon class="icon" icon="external-link-alt" />
      </a>
      <div v-else class="contract-addresses">
        <a :href="urlProxyContract" target="_blank" class="contract-info text">
          {{ proxyAddress }}
          <font-awesome-icon class="icon" icon="external-link-alt" />
        </a>
        <p class="title-address text-small">
          {{ $t('data_feed_details.underlying_feed_contract').toUpperCase() }}
        </p>
        <a
          :href="urlUnderlyingContract"
          target="_blank"
          class="contract-info text"
        >
          {{ feedAddress }}
          <font-awesome-icon class="icon" icon="external-link-alt" />
        </a>
      </div>
      <p class="title-address text-small">
        {{ $t('data_feed_details.erc2362_asset_id').toUpperCase() }}
      </p>
      <p target="_blank" class="contract-id text font-mono">
        {{ contractId }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { urls } from '../constants'
const props = defineProps({
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
})
const isContractVersion2 = computed(
  () => props.feedAddress === props.proxyAddress,
)
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
      margin-top: 8px;
    }
    .contract-id {
      margin-bottom: 8px;
      word-break: break-all;
      max-width: 400px;
    }
    .contract-addresses {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 8px;
    }
    .contract-info {
      color: var(--text-hover);
      word-break: break-all;
      margin-bottom: 8px;
      cursor: pointer;
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .icon {
      font-size: 10px;
      width: 10px;
      height: 10px;
      display: inline-block;
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
