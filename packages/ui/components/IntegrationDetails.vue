<template>
  <div id="integrate" class="p-lg">
    <div class="border-b dark:border-black-950 border-white-50 pb-lg">
      <p class="title-details text">
        {{ $t('data_feed_details.integration_details_description', [network]) }}
      </p>
      <div
        class="mt-lg grid grid-cols-[max-content_max-content] md:grid-cols-1 justify-center md:justify-start gap-x-lg gap-y-sm items-center"
      >
        <div class="grid gap-md">
          <a
            :href="urls.integrateThroughProxy"
            target="_blank"
            class="flex justify-center [&&]:md:justify-start"
          >
            <WButton :type="ButtonType.arrow">
              {{ $t('data_feed_details.integrate_proxy') }}</WButton
            >
          </a>
          <p class="text-highlighted">
            {{ $t('data_feed_details.recommended_for_testing') }}
          </p>
        </div>
        <div class="grid gap-md">
          <a
            :href="urls.integrateDirectly"
            target="_blank"
            class="flex justify-center [&&]:md:justify-start"
          >
            <WButton :type="ButtonType.arrow">
              {{ $t('data_feed_details.integrate_directly') }}
            </WButton>
          </a>
          <p class="text-highlighted">
            {{ $t('data_feed_details.optimized_for_gas_cost') }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="mt-lg grid grid-cols-[max-content_max-content] md:grid-cols-1 gap-lg"
    >
      <div class="grid gap-sm">
        <div v-if="isContractVersion2">
          <p class="text-bold">
            {{ $t('data_feed_details.contract_address_title').toUpperCase() }}
          </p>
          <ExternalLink :label="proxyAddress" :url="urlProxyContract" />
        </div>
        <div v-else>
          <p class="text-bold">
            {{ $t('data_feed_details.proxy_address').toUpperCase() }}
          </p>
          <ExternalLink :label="proxyAddress" :url="urlProxyContract" />
          <p class="text-bold mt-md">
            {{ $t('data_feed_details.underlying_feed_contract').toUpperCase() }}
          </p>
          <ExternalLink :label="feedAddress" :url="urlUnderlyingContract" />
        </div>
      </div>
      <div class="grid grid-rows-[max-content_max-content]">
        <p class="text-bold h-max">
          {{ $t('data_feed_details.erc2362_asset_id').toUpperCase() }}
        </p>
        <p target="_blank" class="text-highlighted font-mono h-max">
          {{ contractId }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { urls } from '../constants'
import { WButton, ButtonType } from 'wit-vue-ui'
import ExternalLink from './ExternalLink.vue'
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
