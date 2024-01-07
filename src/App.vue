<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MovieTable from './components/MovieTable.vue'
</script>

<template>
  <div class="main-container">
    <div class="top-bar bar">
      <h1>MovieDB</h1>
    </div>
    <MovieTable />
    <!--    <RouterView /> -->
  </div>
</template>

<style scoped>
.main-container {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
}
.bar {
  display: flex;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
}
.bar h1 {
  font-size: 3rem;
}
.top-bar {
  border-bottom: 1px solid white;
}
.bottom-bar {
  gap: 20px;
  justify-content: space-around;
}

/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */
</style>
