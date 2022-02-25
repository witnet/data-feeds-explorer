<template>
  <nuxt-link :to="{ hash: `#${hash}` }" @click.native="handleClick(hash)">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    hash: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick(anchorId) {
      if (this.$route.hash) {
        const anchor = document.querySelector(`#${anchorId}`)
        if (anchor) {
          window.scrollTo({
            top: anchor.getBoundingClientRect().top + window.pageYOffset,
          })
        }
      }
    },
  },
}
</script>
