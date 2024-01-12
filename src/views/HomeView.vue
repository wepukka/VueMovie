<script setup>
// API //
import { apiFetchMovies, apiFetchWithFilters } from '../../api'

// Components //
import MovieTable from '@/components/MovieTable.vue'
import MovieFilters from '@/components/MovieFilters.vue'
import ErrorMsg from '@/components/ErrorMsg.vue'
</script>

<template>
  <div class="intro">
    Welcome to MovieDB, your ultimate destination for managing and exploring your movie collection
    effortlessly!
  </div>
  <MovieFilters @pushQueryAndReload="pushQueryAndReload" :filters="filters" />
  <MovieTable :movies="movies" :loading="loadingMovies" />
  <ErrorMsg v-if="isError" :errorMsg="errorMsg" />
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      loadingMovies: false,
      isError: false,
      errorMsg: '',
      filters: {}
    }
  },

  async mounted() {
    this.loadingMovies = true

    // Fetch with query //
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)

    if (urlParams.size !== 0) {
      urlParams.has('title')
        ? (this.filters.title = urlParams.get('title'))
        : (this.filters.title = '')
      urlParams.has('year') ? (this.filters.year = urlParams.get('year')) : (this.filters.year = '')
      urlParams.has('genre')
        ? (this.filters.genre = urlParams.get('genre'))
        : (this.filters.genre = '')

      return this.fetchWithFilters({
        title: this.filters.title,
        year: this.filters.year,
        genre: this.filters.genre
      })
    }

    // If no query, fetch all movies
    let _movies = await apiFetchMovies()
    if (_movies.payload.success === true) {
      this.movies = _movies.payload.data
    } else {
      this.movies = []
      this.isError = true
      this.errorMsg = _movies.payload.errorMsg
    }
    return (this.loadingMovies = false)
  },
  methods: {
    async pushQueryAndReload(filters) {
      await this.$router.push({
        name: 'home',
        params: { filter: 'filter' },
        query: { title: filters.title, year: filters.year, genre: filters.genre }
      })
      return location.reload()
    },
    async fetchWithFilters(filters) {
      this.isError = false
      let filteredMovies = await apiFetchWithFilters(filters)

      if (!filteredMovies.payload.success) {
        this.movies = []
        this.isError = true
        this.errorMsg = filteredMovies.payload.errorMsg
      } else {
        this.movies = filteredMovies.payload.data
      }
      return (this.loadingMovies = false)
    }
  }
}
</script>

<style scoped>
.intro {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}
</style>
