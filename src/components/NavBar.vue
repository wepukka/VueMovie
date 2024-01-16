<script setup></script>

<template>
  <div class="nav">
    <h1>MovieDB</h1>
    <div class="nav-links" :class="navOpen ? 'toggled' : null">
      <a @click="routerPush('/', $event)">Home</a>
      <a @click="routerPush('/contribute', $event)">Contribute</a>
    </div>
    <div class="toggle-mobile-nav" :class="navOpen ? 'expanded' : null" @click="toggleNav()">
      <div id="line1" className="line"></div>
      <div id="line2" className="line"></div>
      <div id="line3" className="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeMount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    routerPush(url) {
      this.$router.push(url)
      document.getElementsByTagName('body')[0].style.overflowY = 'visible'
      return (this.navOpen = false)
    },
    toggleNav() {
      this.navOpen = !this.navOpen
      if (this.navOpen) {
        return (document.getElementsByTagName('body')[0].style.overflowY = 'hidden')
      } else {
        return (document.getElementsByTagName('body')[0].style.overflowY = 'visible')
      }
    },

    onResize() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth > 600) {
        this.navOpen = false
      }
    }
  },
  data() {
    return {
      navOpen: false,
      windowWidth: window.innerWidth
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid black;
}
.nav-links {
  display: flex;
  align-items: center;
}
.nav a {
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  color: black;
}
.nav-links a:hover {
  background-color: var(--item-background-hover);
}

.toggle-mobile-nav {
  cursor: pointer;
  display: none;
  position: relative;
  min-width: 35px;
  min-height: 25px;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  background-color: black;
  width: 100%;
  height: 5px;
  border-radius: 2.5px;
}

.expanded .line {
  position: absolute;
  transition: transform 500ms ease-in-out;
  top: 45%;
}

.expanded #line1 {
  transform: rotate(45deg);
}
.expanded #line2 {
  display: none;
}
.expanded #line3 {
  transform: rotate(-45deg);
}

.line {
  width: 100%;
  background-color: black;
  height: 5px;
}

@media (max-width: 600px) {
  .toggle-mobile-nav {
    display: flex;
    flex-direction: column;
  }
  .nav-links {
    position: fixed;
    flex-direction: column;
    margin-top: 97px;
    width: 100%;
    left: -600px;
    top: 0;
    transition: all 500ms;
    background-color: var(--item-background);
    z-index: 99;
    height: 100vh;
  }
  .nav-links a {
    padding: 25px;
    color: white;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgb(255, 255, 255);
  }

  .toggled {
    left: 0;
  }
}
</style>
