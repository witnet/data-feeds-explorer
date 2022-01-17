<template>
  <div class="nav-container" :class="{ drop: isMenuVisible }">
    <nav class="navbar" :class="{ open: isMenuVisible }">
      <nuxt-link :to="localePath('/')">
        <h1 class="logo-container">
          <WitnetLogo class="witnet-logo" />
          <p class="logo-subtitle">Witnet</p>
          <p class="logo-subtitle">Data Feeds</p>
        </h1>
      </nuxt-link>
      <label class="responsive-menu" @click="toggleMenu">
        <a class="target-burger" :class="{ visible: isMenuVisible }">
          <ul class="buns">
            <li class="bun"></li>
            <li class="bun"></li>
          </ul>
        </a>
      </label>
      <transition name="dropdown" class="dropdown">
        <ul class="tab-container" :class="{ visible: isMenuVisible }">
          <li class="tab" @click="closeMenu">
            <a :href="requestDataFeedUrl" target="_blank">
              <Button class="btn">{{ $t('navbar.request_data_feed') }}</Button>
            </a>
          </li>
        </ul>
      </transition>
    </nav>
  </div>
</template>

<script>
import { requestDataFeedUrl } from '../constants'

export default {
  data() {
    return {
      hover: false,
      displayBox: false,
      isMenuVisible: false,
      requestDataFeedUrl,
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
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  .logo-container {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    padding: 16px;
    text-decoration: none;
    column-gap: 8px;

    .witnet-logo {
      width: 90px;
      grid-row: 1 / span 2;
    }
    .logo-subtitle-color {
      font-size: 18px;
      align-self: flex-start;
      color: var(--logo-dot);
    }
    .logo-subtitle {
      font-size: 18px;
      align-self: flex-end;
      color: var(--logo-main);
    }
  }
  .responsive-menu {
    display: none;
    font-size: 34px;
  }
  .tab-container {
    list-style: none;
    display: flex;
    align-items: center;
    &.visible {
      background: var(--bg);
      display: block;
      padding: 0;
    }
    .tab {
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: color 0.1s ease;
      .btn {
        max-width: max-content;
        margin: 0;
      }
      .slash {
        color: $green-1;
      }

      &:hover {
        color: $green-1;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .navbar {
    padding: 0 24px;
    margin: 0;

    &.open {
      height: 100vh;
    }
    .logo {
      margin: 0;
    }
  }
  .drop {
    position: absolute;
  }
}

@media screen and (max-width: 950px) {
  .drop {
    position: fixed;
    top: 0;
    overflow: hidden;
    height: 100%;
    z-index: 15;
    overflow-y: hidden;
  }

  .navbar {
    display: block;
    position: relative;
    padding: 0;
    .responsive-menu {
      display: block;
      cursor: pointer;
      position: absolute;
      top: 8px;
      width: 32px;
      right: 24px;
    }
    .tab-container {
      list-style: none;
      display: none;
      text-align: center;
      width: 100vw;
      margin: 0;
      cursor: pointer;
      &.visible {
        box-sizing: border-box;
        display: block;
        padding: 0;
        padding-top: 32px;
      }
      .tab {
        cursor: pointer;
        display: block;
        align-items: center;
        text-decoration: none;
        .social {
          display: none;
        }
      }
    }
  }
}

.target-burger {
  display: block;
  transition: 0.5s;
  margin-top: 16px;
  &:hover {
    cursor: pointer;
    opacity: opacity(0.45);
  }
  &.visible {
    ul.buns {
      width: 32px;
      height: 32px;
      li.bun {
        -webkit-transform: rotate(45deg) translateZ(0);
        transform: rotate(45deg) translateZ(0);
        &:last-child {
          -webkit-transform: rotate(-45deg) translateZ(0);
          transform: rotate(-45deg) translateZ(0);
        }
      }
    }
  }
  .buns {
    width: 32px;
    height: 32px;
    list-style: none;
    padding: 0;
    position: absolute;
    -webkit-transition: -webkit-transform 1s cubic-bezier(0.23, 1, 0.32, 1),
      color 1s cubic-bezier(0.23, 1, 0.32, 1);
    transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1),
      color 1s cubic-bezier(0.23, 1, 0.32, 1);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    color: var(--text);
    .bun {
      width: 100%;
      height: 3px;
      background-color: var(--text);
      position: absolute;
      top: 50%;
      margin-top: -0.75px;
      -webkit-transform: translateY(-3.75px) translateZ(0);
      transform: translateY(-3.75px) translateZ(0);
      -webkit-transition: -webkit-transform 1s cubic-bezier(0.23, 1, 0.32, 1),
        background-color 1s cubic-bezier(0.23, 1, 0.32, 1);
      transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1),
        background-color 1s cubic-bezier(0.23, 1, 0.32, 1);
      &:last-child {
        -webkit-transform: translateY(3.75px) translateZ(0);
        transform: translateY(3.75px) translateZ(0);
      }
    }
  }
}
</style>
