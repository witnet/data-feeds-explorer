<template>
  <div :class="{ drop: isMenuVisible }">
    <nav class="navbar">
      <label class="responsive-menu" @click="toggleMenu">&#9776;</label>
      <transition name="dropdown" class="dropdown">
        <ul class="tab-container" :class="{ visible: isMenuVisible }">
          <li @mouseover="hover = true" @mouseleave="hover = false">
            <a class="tab" href="https://github.com/witnet" target="_blank">
              <img
                class="social"
                src="~/assets/svg/github.svg"
                alt="github-logo"
              />
            </a>
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
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 10vh;
  justify-content: flex-end;
  .logo-container {
    display: flex;
    align-items: center;
    text-decoration: none;
    .logo {
      width: 80px;
    }
  }
  .responsive-menu {
    color: $white;
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
      font-size: 1.12rem;
      display: flex;
      color: $white;
      align-items: center;
      text-decoration: none;
      padding: 24px 32px;
      .social {
        width: 20px;
        margin: auto 8px;
      }
      .slash {
        color: $green-1;
      }
      &:hover {
        color: $green-1;
      }
    }
    .language-btn {
      //until we have translations
      display: none;
      //
      display: flex;
      padding: 0 8px;
      height: 30px;
      margin-right: 1vw;
      align-items: center;
      text-justify: center;
      border: 1px solid $green-1;
      color: $green-1;
      cursor: pointer;
      &:active {
        outline: none;
      }
      &:hover {
        opacity: 0.75;
      }
      .arrow {
        padding-left: 8px;
        width: 8px;
      }
    }
    .drop-down {
      position: absolute;
      display: block;
      width: 100px;
      // margin-top: 16px;
      flex-direction: column;
      & .drop-down-item {
        cursor: pointer;
        border: none;
        background-color: none;
        color: $white;
        padding: 8px;
        border-bottom: 1px solid $white;
        &:hover {
          opacity: 0.75;
        }
        &:active {
          box-shadow: none;
          outline: none;
        }
      }
    }
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
    background-color: transparent;
    display: block;
    position: fixed;
    .logo-container {
      .logo {
        margin: 10px;
        width: 70px;
      }
    }
    .responsive-menu {
      display: block;
      cursor: pointer;
      position: absolute;
      top: 4px;
      right: 10px;
    }
    .tab-container {
      background-color: transparent;
      list-style: none;
      display: none;
      text-align: center;
      height: 100vh;
      width: 100vw;
      padding: 0;
      margin: 0;
      &.visible {
        display: block;
      }
      .tab {
        border-bottom: 1px solid $white;
        display: block;
        color: $white;
        align-items: center;
        text-decoration: none;
        padding: 24px 32px;
        .social {
          display: none;
        }
      }
      .language-btn {
        display: none;
        color: $white;
        justify-content: space-between;
        margin: 16px 50px 0 50px;
        border: none;
        border-bottom: 1px solid $white;
        &:hover {
          color: $green-1;
        }
        .arrow {
          display: block;
        }
      }
      .drop-down {
        position: relative;
        border-top: none;
        margin: 0 auto;
        padding: 0;
        width: 275px;
        .drop-down-item {
          border-bottom: 1px solid $white;
          padding: 10px;
          text-align: left;
        }
      }
    }
  }
}
</style>
