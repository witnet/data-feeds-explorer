<template>
  <div class="links">
    <a class="link" :href="urls.github" target="_blank">
      <SvgIcon name="github" />
    </a>
    <a class="link" :href="urls.telegram" target="_blank">
      <SvgIcon name="telegram" />
    </a>
    <a class="link" :href="urls.discord" target="_blank">
      <SvgIcon name="discord" />
    </a>
    <a class="link" :href="urls.twitter" target="_blank">
      <SvgIcon name="twitter" />
    </a>
    <a class="link" :href="urls.reddit" target="_blank">
      <SvgIcon name="reddit" />
    </a>
    <a class="link" :href="urls.youtube" target="_blank">
      <SvgIcon name="youtube" />
    </a>
  </div>
</template>

<script>
import { urls } from '../constants'

export default {
  data() {
    return {
      urls,
    }
  },
}
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
  .link {
    margin-right: 24px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
@media (max-width: 1200px) {
  .links {
    margin: 0 24px;
  }
}
</style>
