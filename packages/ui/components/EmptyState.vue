<template>
  <div class="grid gap-md justify-center justify-items-center w-full pb-2xl">
    <SvgIcon name="empty" tw-styles="w-[250px] h-auto" />
    <p class="text">{{ text }}</p>
    <a :href="urls.requestDataFeed" target="_blank">
      <WButton :type="ButtonType.primary">
        {{ $t('navbar.request_data_feed') }}
      </WButton>
    </a>
  </div>
</template>

<script setup lang="ts">
import { urls } from '~/constants'
import { WButton, ButtonType } from 'wit-vue-ui'
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>
