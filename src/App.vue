<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main-container">
    <div class="top-bar bar">
      <h1>MovieDB</h1>
      <div class="wrapper">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contribute">Contribute</RouterLink>
      </div>
    </div>
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
v-button {
  background-color: red;
}

.main-container {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
}
.bar h1 {
  font-size: 1.5rem;
  background: -webkit-linear-gradient(var(--background) 10%, #ffffff, var(--background) 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.top-bar {
  border-bottom: 1px solid white;
}

a {
  padding: 10px 20px 10px 20px;
  color: rgb(218, 218, 218);
  text-decoration: none; /* no underline */
}
.router-link-exact-active {
  color: var(--color-text);
  font-weight: bold;
}

/* Media */
@media (min-width: 600px) {
  .bar h1 {
    font-size: 3rem;
  }
}
</style>
