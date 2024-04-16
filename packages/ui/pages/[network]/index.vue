<template>
  <EcosystemNetworkList />
</template>
<script setup>
const route = useRoute()
const currentEcosystem = ref(route.params.network.toString())
const currentEcosystemSeoFormat = ref(currentEcosystem.value.toUpperCase())
useHead({
  title: `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'viewport-fit=cover, width=device-width, initial-scale=1',
    },
    {
      hid: 'title',
      name: 'title',
      content: `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
    },
    {
      hid: 'description',
      name: 'description',
      content: `Explore the list of decentralized data feeds on ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: `Explore the list of decentralized data feeds on ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: 'Witnet data feeds explorer',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: `Explore the list of decentralized data feeds on ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: 'Witnet data feeds explorer',
    },
  ],
})
useSeoMeta({
  ogTitle: () => `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
  title: () => `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
  description: () =>
    `Explore the list of decentralized data feeds on ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
  ogDescription: () =>
    `Explore the list of decentralized data feeds on ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
  twitterTitle: () => `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
  twitterDescription: () =>
    `Explore the list of decentralized data feeds on ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
})
</script>
