<script setup>
import {} from 'vue'
import { apiFetchMovies } from '../../api'
</script>

<template>
  <div class="filters-container">
    <v-responsive>
      <v-text-field v-model="title" label="Filter By Title" hide-details="auto"></v-text-field>
    </v-responsive>
    <v-responsive>
      <v-text-field
        v-model="release"
        label="Filter By Release"
        hide-details="auto"
        type="number"
        hide-spin-buttons
      ></v-text-field>
    </v-responsive>

    <v-select
      ref="myVSelect"
      class="test"
      v-model="selected_genres"
      :items="genres"
      label="Filter By Genre"
      chips
      multiple
    ></v-select>
    <v-btn block @click="fetchMovies()">Search</v-btn>
  </div>
  <table>
    <tr>
      <th>Title</th>
      <th>Genre</th>
      <th>Release Year</th>
    </tr>
    <tr v-for="(movie, index) in movies" :key="index">
      <td>{{ movie.title }}</td>
      <td>{{ movie.genre }}</td>
      <td>{{ movie.year }}</td>
    </tr>
  </table>
</template>

<!-- this.$refs.myVSelect -->
<script>
export default {
  data() {
    return {
      genres: ['Drama', 'Fiction', 'Documentary'],
      selected_genres: [],
      release: '',
      title: '',
      movies: []
    }
  },
  async mounted() {
    let movies = await apiFetchMovies()
    if (movies.payload.success === true) {
      this.movies = movies.payload.data
    }
  },
  methods: {}
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

/* V-SELECT */
.v-input {
  color: white;
}
</style>
