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
      this.$router.push({ name: 'movie', params: { id: movie._id } })
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
  border-collapse: collapse;
  margin-bottom: 20px;
}
table th,
td {
  text-align: left;
}

table tr th {
  background-color: var(--item-background);
}

table tr {
  background-color: var(--background);
}
table tr td {
  font-size: 0.8rem;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  text-transform: capitalize;
}
table tr:first-child th {
  font-size: 1rem;
  height: 60px;
  padding: 20px 10px 20px 10px;
}
table tr:not(:first-child):hover {
  background: rgba(150, 142, 142, 0.5);
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.5);
}

/* V-SELECT */
.v-input {
  color: white;
}

@media (min-width: 600px) {
  table tr td {
    font-size: 1rem;
  }
  table tr:first-child th {
    font-size: 1.2rem;
  }
}
</style>
