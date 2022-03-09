<template>
  <Main />
</template>

<script>
export default {
  mounted() {
    this.$router.push(
      `/en/${this.$store.state.selectedNetwork[0].network.toLowerCase()}`
    )
  },
}
</script>
