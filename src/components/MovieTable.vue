<script setup>
import LoadingCircle from './LoadingCircle.vue'
</script>

<template>
  <div v-if="!loading" class="wrapper">
    <table>
      <tr>
        <th>Title</th>
        <th>Genre</th>
        <th>Release Year</th>
      </tr>
      <tr v-for="(movie, index) in displayedMovies" :key="index" @click="goToMovieView(movie)">
        <td>{{ movie.title }}</td>
        <td>{{ movie.genre }}</td>
        <td>{{ movie.year }}</td>
      </tr>
    </table>
    <div class="pagination">
      <button
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </button>
    </div>
  </div>
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
      title: '',
      itemsPerPage: 10,
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.itemsPerPage)
    },
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.movies.slice(startIndex, endIndex)
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
    },
    goToMovieView(movie) {
      this.$router.push({ name: 'movie', params: { id: movie._id } })
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
  border-collapse: collapse;
}
table th,
td {
  text-align: left;
}

table tr th {
  background-color: rgb(187, 116, 116);
}

tr,
td:nth-last-child(-n + 2) {
  width: 15%; /* Equal width for each column, adjust as needed */
  word-wrap: break-word; /* Wrap long content */
}

table tr td {
  font-size: 0.8rem;
  padding: 10px;
  cursor: pointer;
  text-transform: capitalize;
  overflow: hidden;
}
table tr:first-child th {
  font-size: 1rem;
  height: 60px;
  padding: 20px 10px 20px 10px;
}
table tr:hover {
  background-color: rgba(88, 80, 80, 0.2);
}

/* V-SELECT */

/* PAGINATION */
.pagination {
  display: flex;
  justify-content: center;
  background-color: var(--background);
  margin-bottom: 20px;
  height: 50px;
  border-top: 1px solid;
}

.pagination button {
  margin: 5px;

  padding: 5px 10px;
  cursor: pointer;
  background-color: var(--item-background);
  width: 50px;
}
.pagination .active {
  color: var(--background);
  border-color: #007bff;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
