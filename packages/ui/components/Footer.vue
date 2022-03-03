<template>
  <div class="footer">
    <WitnetLogo class="witnet-logo white" />
    <ul class="links-container">
      <a class="link" :href="documentationUrl" target="_blank">
        {{ $t('footer.documentation') }}
      </a>
      <a class="link" :href="requestDataFeedUrl" target="_blank">
        {{ $t('footer.request_data_feed') }}
      </a>
      <a class="link" :href="witnetUrl" target="_blank">
        {{ $t('footer.about_witnet') }}
      </a>
    </ul>
    <p class="copyright">{{ $t('footer.copyright') }}</p>
  </div>
</template>

<script>
import { documentationUrl, requestDataFeedUrl, witnetUrl } from '../constants'
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'disable'].includes(value)
      },
    },
  },
  data() {
    return {
      documentationUrl,
      requestDataFeedUrl,
      witnetUrl,
    }
  },
}
</script>

<style scoped lang="scss">
.footer {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  min-height: 20vh;
  align-items: center;
  padding: 16px;
  background: var(--footer-bg);
  color: var(--white-text);
  .links-container {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-gap: 16px;
    grid-template-rows: auto;
    .link {
      color: var(--white-text);
      cursor: pointer;
      padding: 0;
      font-size: var(--text-size-medium);
    }
  }
  .copyright {
    font-size: var(--text-size-small);
  }
  .witnet-logo {
    width: 60px;
  }
}
@media (max-width: 600px) {
  .links-container {
    margin: 16px 0;
  }
}
</style>
