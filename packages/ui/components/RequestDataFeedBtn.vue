<template>
  <a
    :href="urls.requestDataFeed"
    target="_blank"
    rel="nofollow"
  >
    <CustomButton class="btn">{{
      $t('navbar.request_data_feed')
    }}</CustomButton>
  </a>
</template>

<script setup lang="ts">
import { urls } from '../constants'
</script>
