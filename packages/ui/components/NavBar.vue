<template>
  <div
    :class="isLandingPage ? 'bg-black-900' : 'bg-black-950'"
    class="flex justify-center"
  >
    <div class="flex w-full justify-between py-md px-xl max-w-[1300px]">
      <nuxt-link :to="localePath('/')" aria-label="home">
        <SvgIcon name="witnet-logo" class="w-[284px]" />
      </nuxt-link>
      <a :href="urls.documentation" target="_blank" rel="nofollow">
        <WButton :tyle="ButtonType.primary">{{ $t('documentation') }}</WButton>
      </a>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const route = useRoute()
import { urls } from '../constants'
import { WButton, ButtonType } from 'wit-vue-ui'
const isLandingPage = computed(() => route.path === '/')
</script>
