<template>
  <div class="delete-movie-container">
    <div class="delete-inner-container">
      <p>Are you sure you want to delete ?</p>
      <h2 class="delete-title">{{ movie.title }}</h2>
    </div>
    <div class="delete-inner-container button-container">
      <v-btn block style="color: var(--pos)" @click="deleteMovie()">YES</v-btn>
      <v-btn block style="color: var(--neg)" @click="stopDeleteProcess()">NO</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  methods: {
    stopDeleteProcess() {
      this.$emit('stopDeleteProcess')
    },
    deleteMovie() {
      this.$emit('deleteMovie')
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.delete-movie-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--movie-background);
  text-align: center;
}

.delete-inner-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 20px;
  gap: 10px;
}
.delete-title {
  font-weight: bold;
  text-transform: capitalize;
}
.button-container {
  width: 200px;
}

p {
  font-size: 1rem;
}
h2 {
  font-size: 1.2rem;
}

@media (min-width: 600px) {
  h2 {
    font-size: 1.5rem;
  }
}
</style>
