<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="main-container" id="main-container">
    <NavBar />
    <RouterView />
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
  padding: 20px 10px 20px 10px;
  background-color: var(--background);
  min-height: 100vh;
}

</style>
