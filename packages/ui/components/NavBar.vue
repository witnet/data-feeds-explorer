<template>
  <div class="nav-container" :class="{ drop: isMenuVisible }">
    <nav class="navbar">
      <h1 class="logo-container">
        <WitnetLogo class="witnet-logo" />
        <p class="logo-subtitle">DATA</p>
        <p class="logo-subtitle-color">FEED</p>
      </h1>
      <label class="responsive-menu" @click="toggleMenu">&#9776;</label>
      <transition name="dropdown" class="dropdown">
        <ul class="tab-container" :class="{ visible: isMenuVisible }">
          <li class="tab" @mouseover="hover = true" @mouseleave="hover = false">
            About
          </li>
          <li class="tab" @mouseover="hover = true" @mouseleave="hover = false">
            <GithubLogo />
          </li>
        </ul>
      </transition>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hover: false,
      displayBox: false,
      isMenuVisible: false,
    }
  },
  methods: {
    closeMenu() {
      this.isMenuVisible = false
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },
    displayDropDown() {
      this.displayBox = !this.displayBox
    },
    onClose() {
      this.active = false
    },
  },
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background: var(--nav-bar-background);
  justify-content: space-between;
  align-items: center;
  max-width: 1500px;
  margin: 0 auto;
  padding: 16px 140px 16px 140px;

  .logo-container {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    text-decoration: none;
    column-gap: 8px;

    .witnet-logo {
      grid-row: 1 / span 2;
    }
    .logo-subtitle-color {
      align-self: flex-start;
      color: var(--logo-dot);
    }
    .logo-subtitle {
      align-self: flex-end;
      color: var(--logo-main);
    }
  }
  .responsive-menu {
    color: var(--text);
    display: none;
    font-size: 34px;
  }
  .tab-container {
    list-style: none;
    display: flex;
    align-items: center;
    & .visible {
      display: block;
    }
    .tab {
      cursor: pointer;
      font-size: 1.12rem;
      display: flex;
      font-weight: 600;
      color: var(--text);
      align-items: center;
      text-decoration: none;
      margin: 24px 32px;
      &:hover {
        color: var(--text-hover);
      }
    }
  }
  .drop {
    position: absolute;
  }
}
@media screen and (max-width: 1200px) {
  .drop {
    position: fixed;
    top: 0;
    overflow: hidden;
    height: 100%;
    z-index: 15;
    overflow-y: hidden;
  }
  .navbar {
    left: 0;
    right: 0;
    top: 0;
    display: block;
    position: relative;
    padding: 0;
    .logo-container {
      padding: 16px;
    }
    .responsive-menu {
      display: block;
      cursor: pointer;
      position: absolute;
      top: 4px;
      right: 10px;
    }
    .tab-container {
      list-style: none;
      display: none;
      text-align: center;
      height: 100vh;
      width: 100vw;
      padding: 0;
      margin: 0;
      cursor: pointer;
      &.visible {
        display: block;
      }
      .tab {
        cursor: pointer;
        display: block;
        color: var(--text);
        align-items: center;
        text-decoration: none;
        padding: 24px 32px;
        .social {
          display: none;
        }
      }
    }
  }
}
</style>
