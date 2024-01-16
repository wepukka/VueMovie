<script setup></script>

<template>
  <div class="movie-card-container">
    <h1>{{ movie.title }}</h1>
    <img :src="movie.image" />
    <div class="card-details">
      <p>{{ movie.year }}</p>
      <p>{{ movie.genre }}</p>
    </div>
    <div class="card-lore-container">
      <h2>Lore</h2>
      <p class="card-lore">{{ movie.lore !== '' ? movie.lore : 'This movie is missing lore!' }}</p>
    </div>
    <div class="card-buttons">
      <v-btn style="color: var(--pos)" @click="startEditProcess()">Edit</v-btn>
      <v-btn style="color: var(--neg)" @click="startDeleteProcess()">Delete</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  data() {
    return {}
  },
  methods: {
    startEditProcess() {
      this.$emit('startEditProcess')
    },
    startDeleteProcess() {
      this.$emit('startDeleteProcess')
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
img {
  max-height: 200px;
  max-width: 100%;
  border-radius: 20px;
  margin-bottom: 10px;
}
.movie-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-card-inner-container {
  display: flex;
  justify-content: space-between;
}

.movie-card-container h1,
p:not(.card-lore) {
  text-transform: capitalize;
}

.card-details {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  text-align: center;
}

.card-details p {
  padding: 5px;
  font-size: 18px;
  margin: 5px 0;
  background-color: var(--background);
  box-shadow: 0px 2px 4px 1px rgba(46, 46, 46, 0.5);
}

.card-lore-container {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #ccc;
  width: 100%;
  padding-top: 10px;
}

.card-lore {
  font-style: italic;
  color: #555;
}

.card-buttons {
  display: flex;
  align-self: flex-end;
  margin-top: 20px;
  gap: 10px;
}

@media (min-width: 600px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
