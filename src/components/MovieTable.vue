<script setup>
import LoadingCircle from './LoadingCircle.vue'
</script>

<template>
  <table v-if="!loading">
    <tr>
      <th>Title</th>
      <th>Genre</th>
      <th>Release Year</th>
    </tr>
    <tr v-for="(movie, index) in movies" :key="index" @click="goToMovieView(movie)">
      <td>{{ movie.title }}</td>
      <td>{{ movie.genre }}</td>
      <td>{{ movie.year }}</td>
    </tr>
  </table>
  <div class="loading-container" v-else>
    <LoadingCircle />
  </div>
</template>

<!-- this.$refs.myVSelect -->
<script>
export default {
  props: {
    movies: Object,
    loading: Boolean
  },
  data() {
    return {
      genres: ['Drama', 'Fiction', 'Documentary'],
      selected_genres: [],
      release: '',
      title: ''
    }
  },
  methods: {
    goToMovieView(movie) {
      this.$router.push({ name: 'movie', params: { id: movie._id } }) // TEST PROPS !! //
    }
  }
}
</script>

<style scoped>
.filters-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
/* TABLE  */
table {
  width: 100%;
  text-align: center;
}
table th,
td {
  text-align: left;
}
table tr {
  background-color: #ffffffd5;
}
table tr th {
  background-color: var(--item-background);
}
table tr td {
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
}
table tr:first-child th {
  font-size: 1.2rem;
  height: 60px;
  padding: 20px 10px 20px 10px;
}
table tr:hover {
  border: 1px solid white;
  background: var(--item-background-hover);
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
/* V-SELECT */
.v-input {
  color: white;
}
</style>
