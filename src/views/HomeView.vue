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
  <MovieFilters @pushQueryAndReload="pushQueryAndReload" />
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
      titleFilter:"",
      yearFilter:"",
      genreFilter:""
    }
  },
  
  async mounted() {
    this.loadingMovies = true

  // Fetch with query //     
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    if (urlParams.size !== 0) {

    urlParams.has("title") ? this.titleFilter = urlParams.get("title") : this.titleFilter = ""
    urlParams.has("year") ? this.yearFilter = urlParams.get("year") : this.yearFilter = ""
    urlParams.has("genre") ? this.genreFilter = urlParams.get("genre") : this.genreFilter = ""

      return this.fetchWithFilters({
         title: this.titleFilter,
          year: this.yearFilter,
          genre: this.genreFilter
      })
    }
    
    // If no query, fetch all movies 
    let _movies = await apiFetchMovies()
      if (_movies.payload.success === true) {
        this.movies = _movies.payload.data
      }
      else {
        this.movies = []
        this.isError = true
        this.errorMsg = _movies.payload.errorMsg
      }
      return this.loadingMovies = false
  },
  methods: {
   async pushQueryAndReload(filters) {
        await this.$router.push({name:"home", params: { filter: "filter"}, query: { title: filters.title, year: filters.year, genre: filters.genre }})
        return location.reload()
    },
    async fetchWithFilters(filters) {
      this.isError = false
      let filteredMovies = await apiFetchWithFilters(filters)

      if (!filteredMovies.payload.success) {
        this.movies = []
        this.isError = true
        this.errorMsg = filteredMovies.payload.errorMsg
      }
      else {
        this.movies = filteredMovies.payload.data
      }
      return this.loadingMovies = false
    },
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
