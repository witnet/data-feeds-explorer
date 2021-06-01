<template>
  <div class="section">
    <NavBar />
    <div class="main">
      <h1>
        <span class="text">{{ $t('hero.title') }}</span>
      </h1>
      <p>
        <i18n class="text" path="hero.text.main" tag="span">
          <span class="highlight">{{ $t('hero.text.highlight') }}</span>
        </i18n>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section {
  color: $white;
  padding: 0 180px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: 1fr;

  .main {
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: left;
    max-width: 40vw;
    justify-self: center;
  }
  .text {
    background-color: $dark-blur;
    line-height: 1.5;
  }
  .highlight {
    color: $red;
  }
}
@media (max-width: 1200px) {
  .section {
    padding: 0 0;
    .main {
      max-width: 100%;
      padding: 40px 40px;
    }
  }
}
</style>
