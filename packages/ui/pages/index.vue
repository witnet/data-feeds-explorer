<template>
  <div class="w-screen h-max">
    <!-- <HeroSection /> -->
    <FeedsSection />
  </div>
</template>

<script setup>
useSeoMeta({
  ogTitle: () => 'Data Feeds Explorer | Witnet',
  title: () => 'Data Feeds Explorer | Witnet',
  description: () =>
    'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
  ogDescription: () =>
    'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
  twitterTitle: () => 'Data Feeds Explorer | Witnet',
  twitterDescription: () =>
    'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
})
</script>
