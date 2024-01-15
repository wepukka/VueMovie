<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="main-container" id="main-container">
    <NavBar />
    <RouterView />
    <!-- <AddMovie /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
.main-container {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  background-color: var(--background);
  min-height: 100vh;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
  max-width: 1100px;
  margin: 0 auto;
}
.bar h1 {
  font-size: 1.5rem;
}

.top-bar {
  border-bottom: 1px solid white;
}

a {
  padding: 10px 20px 10px 20px;
  color: var(--text);
  text-decoration: none; /* no underline */
}
.router-link-exact-active {
  color: var(--item-background);
  font-weight: bold;
}

/* Media */
@media (min-width: 600px) {
  .bar h1 {
    font-size: 3rem;
  }
}
</style>
