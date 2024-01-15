<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="nav">
    <h1>Movie DB</h1>
    <div class="nav-links" :class="navOpen ? 'toggled' : null">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contribute">Contribute</RouterLink>
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
    toggleNav() {
      this.navOpen = !this.navOpen
      console.log(this.navOpen)
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
.router-link-exact-active {
  font-weight: bold;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 80px;
  box-shadow: 0px 1px 5px 0.1px black;
  margin-bottom: 20px;
}
.nav-links {
  display: flex;
}
.nav a {
  padding: 10px;
  text-decoration: none;
  color: black;
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
  top: 45%;
}

.expanded #line1 {
  transition: 500ms ease-in-out;
  transform: rotate(45deg);
}
.expanded #line2 {
  display: none;
}
.expanded #line3 {
  transition: 500ms ease-in-out;
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
    position: absolute;
    flex-direction: column;
    padding-top: 10px;
    gap: 10px;
    margin-top: 80px;
    width: 100%;
    height: 100%;
    left: -600px;
    top: 0;
    transition: all 500ms;
    background-color: var(--item-background);
    z-index: 99;
  }
  .nav-links a {
    width: 100%;
    text-align: center;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.452);
  }

  .nav-links a:hover {
    background-color: var(--item-background-hover);
  }
  .toggled {
    left: 0;
  }
}
</style>
