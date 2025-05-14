<template>
  <div class="flex w-full justify-between py-md">
    <nuxt-link :to="localePath('/')" aria-label="home">
      <SvgIcon name="witnet-logo" class="w-[284px]" />
    </nuxt-link>
    <a :href="urls.documentation" target="_blank" rel="nofollow">
      <WButton :tyle="ButtonType.primary">{{ $t('documentation') }}</WButton>
    </a>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
import { urls } from '../constants'
import { WButton, ButtonType } from 'wit-vue-ui'
</script>
