<template>
  <div
    :class="
      isLandingPage
        ? 'dark:bg-black-900 bg-white-50'
        : 'dark:bg-black-950 bg-white-50'
    "
    class="flex justify-center h-max"
  >
    <div
      class="flex w-full h-max justify-between items-center sm:flex-col sm:gap-md max-w-[1300px] py-md px-lg [&&]:xs:px-md"
    >
      <nuxt-link :to="'/'" aria-label="home">
        <SvgIcon name="witnet-logo" class="w-[284px] h-auto" />
      </nuxt-link>
      <a :href="urls.documentation" target="_blank" rel="nofollow">
        <WButton :type="ButtonType.primary">{{ $t('documentation') }}</WButton>
      </a>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
import { urls } from '../constants'
import { WButton, ButtonType } from 'wit-vue-ui'
const isLandingPage = computed(() => route.path === '/')
</script>
