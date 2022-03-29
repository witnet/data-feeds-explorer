<template>
  <div class="footer-background">
    <div class="footer">
      <div class="top">
        <div class="links">
          <p class="title">{{ $t('footer.links.witnet.title') }}</p>
          <a class="link" :href="urls.oracle">
            {{ $t('footer.links.witnet.oracle') }}
          </a>
          <a class="link" :href="urls.token" target="_blank">
            {{ $t('footer.links.witnet.token') }}
          </a>
          <a class="link" :href="urls.ecosystem" target="_blank">
            {{ $t('footer.links.witnet.ecosystem') }}
          </a>
          <a class="link" :href="urls.community" target="_blank">
            {{ $t('footer.links.witnet.community') }}
          </a>
          <a class="link" :href="urls.whitepaper" target="_blank">{{
            $t('footer.links.witnet.whitepaper')
          }}</a>
        </div>
        <div class="links">
          <p class="title">{{ $t('footer.links.ecosystem.title') }}</p>
          <a class="link" :href="urls.mining" target="_blank">
            {{ $t('footer.links.ecosystem.full_node') }}</a
          >
          <a class="link" :href="urls.sheikah" target="_blank">{{
            $t('footer.links.ecosystem.wallet')
          }}</a>
          <a class="link" :href="urls.blockExplorer" target="_blank">{{
            $t('footer.links.ecosystem.data_feeds_explorer')
          }}</a>
          <a class="link" :href="urls.blockExplorer" target="_blank">{{
            $t('footer.links.ecosystem.block_explorer')
          }}</a>
        </div>
        <div class="links">
          <p class="title">{{ $t('footer.links.developers.title') }}</p>
          <a class="link" :href="urls.mining" target="_blank">
            {{ $t('footer.links.developers.documentation') }}</a
          >
          <a class="link" :href="urls.sheikah" target="_blank">{{
            $t('footer.links.developers.price_feeds')
          }}</a>
          <a class="link" :href="urls.blockExplorer" target="_blank">{{
            $t('footer.links.developers.randomness')
          }}</a>
          <a class="link" :href="urls.blockExplorer" target="_blank">{{
            $t('footer.links.developers.get_post_request')
          }}</a>
        </div>
        <div class="links">
          <p class="title">{{ $t('footer.links.community.title') }}</p>
          <a class="link" :href="urls.telegram" target="_blank">{{
            $t('footer.links.community.telegram')
          }}</a>
          <a class="link" :href="urls.discord" target="_blank">{{
            $t('footer.links.community.discord')
          }}</a>
          <a class="link" :href="urls.twitter" target="_blank">{{
            $t('footer.links.community.twitter')
          }}</a>
          <a class="link" :href="urls.reddit" target="_blank">{{
            $t('footer.links.community.reddit')
          }}</a>
        </div>
        <div class="alliance-text">
          <SvgIcon class="logo white" name="ado_member" />
          <i18n path="footer.ado_text" tag="p" class="small-description">
            <a class="link underline" :href="urls.ado" target="_blank">
              theado.org
            </a>
          </i18n>
        </div>
      </div>
      <div class="bottom">
        <SvgIcon class="logo white" name="witnet_dark" />
        <i18n path="footer.copyright.base" class="copyright" tag="p">
          <span>2018-{{ new Date().getFullYear() }}</span>
          <a class="link" href="https://witnet.foundation" target="_blank">{{
            $t('footer.copyright.witnet_foundation')
          }}</a>
          <a
            class="link"
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            >{{ $t('footer.copyright.license') }}</a
          >
        </i18n>
      </div>
    </div>
  </div>
</template>

<script>
import {
  documentationUrl,
  requestDataFeedUrl,
  witnetUrl,
  urls,
} from '../constants'

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
      urls,
    }
  },
}
</script>

<style scoped lang="scss">
.footer-background {
  background: var(--footer-bg);
  color: var(--white-text);
  min-height: 20vh;
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.bottom {
  padding-top: 40px;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  row-gap: 16px;
  align-items: center;
  column-gap: 16px;
  .logo {
    width: 40px;
  }
  .white-paper {
    width: min-content;
  }
  .copyright {
    font-size: var(--text-size-small);
    line-height: 1.5;
    max-width: 350px;
    a {
      font-size: inherit;
      text-decoration: underline;
    }
  }
}
.link {
  font-size: var(--text-size-medium);
  color: var(--white-text);
  padding: 4px 0 4px 0;
  &.underline {
    text-decoration: underline;
  }
}
.footer {
  width: 100vw;
  max-width: var(--desktop-margin);
  padding: 48px 32px;
  .top {
    border-bottom: 1px solid var(--white-text);
    display: grid;
    padding-bottom: 40px;
    column-gap: 40px;
    row-gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    justify-content: space-between;
    .links {
      display: flex;
      flex-direction: column;
      .title {
        font-family: Almarai, sans-serif;
        font-size: var(--text-size);
        font-weight: bold;
        padding: 8px 0 8px 0;
      }
    }
    .alliance-text {
      grid-column: span 2;
      font-size: var(--text-size-medium);
      line-height: 1.5;
      .logo {
        width: 50px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
