<script setup>
// API //
import { apiFetchMovies, apiFetchWithFilters } from '../../api'

// Components //
import MovieTable from '@/components/MovieTable.vue'
import MovieFilters from '@/components/MovieFilters.vue'
import ErrorMsg from '@/components/ErrorMsg.vue'
</script>

<template>
  <MovieFilters @fetchWithFilters="fetchWithFilters" />
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
      errorMsg: ''
    }
  },
  async mounted() {
    this.loadingMovies = true
    let _movies = await apiFetchMovies()

    setTimeout(() => {
      if (_movies.payload.success === true) {
        this.movies = _movies.payload.data
        this.loadingMovies = false
      }
    }, 1000)
  },
  methods: {
    async fetchWithFilters(filters) {
      this.isError = false
      let filteredMovies = await apiFetchWithFilters(filters)
      if (!filteredMovies.payload.success) {
        this.movies = []
        this.isError = true
        return (this.errorMsg = filteredMovies.payload.errorMsg)
      }
      return (this.movies = filteredMovies.payload.data)
    }
  }
}
</script>

<style scoped></style>
