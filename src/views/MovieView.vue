<script setup>
// Api
import { apiFetchMovieById, apiDeleteMovie } from '../../api'
// Components
import MovieCard from '@/components/MovieCard.vue'
import EditMovie from '@/components/EditMovie.vue'
import DeleteMovie from '@/components/DeleteMovie.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
</script>

<template>
  <div class="loading-container" v-if="loading">
    <h1>{{loadingMsg}}</h1>
    <LoadingCircle />
  </div>
  <div class="movie-view" v-else>
    <DeleteMovie
      v-if="deleting"
      :movie="movie"
      @stopDeleteProcess="stopDeleteProcess()"
      @deleteMovie="deleteMovie()"
    />
    <EditMovie
      v-else-if="editing"
      :movie="movie"
      @stopEditing="stopEditProcess()"
      @startUpdate="startUpdateProcess()"
    />
    <MovieCard
      v-else
      :movie="movie"
      @startEditProcess="startEditProcess()"
      @startDeleteProcess="startDeleteProcess()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: {},
      success: true,
      loading: false,
      deleting: false,
      editing: false,
      loadingMsg: ""
    }
  },
  methods: {
    async startUpdateProcess() {
      this.loading = true
      this.loadingMsg = "Updating"
      this.stopEditProcess()
      this.fetchMovieById()
      setTimeout(() => { // If we don't wait long enough or refresh the page we will fetch unupdated data 
        this.loading = false
      }, 2000)
    },
    startDeleteProcess() {
      return (this.deleting = true)
    },
    stopDeleteProcess() {
      return (this.deleting = false)
    },
    startEditProcess() {
      return (this.editing = true)
    },
    stopEditProcess() {
      return (this.editing = false)
    },

    async deleteMovie() {
      let deleted = await apiDeleteMovie(this.movie._id)
      if (deleted.payload.success) {
        this.$router.push({ name: 'home' })
      } else {
        window.alert(deleted.payload.errorMsg)
      }
    },
    async fetchMovieById() {
      let movie = await apiFetchMovieById(this.$route.params.id)
      if (movie.payload.success) {
        this.movie = movie.payload.data
      } else {
        this.success = false
      }
    }
  },
  async mounted() {
    this.loading = true;
    this.loadingMsg = "Loading Movie!"
    await this.fetchMovieById()
    this.loading = false
  }
}
</script>

<style scoped>
.movie-view {
  display: flex;
  flex-direction: column;
  background-color: var(--movie-background);
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 5px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
}

@media (min-width: 600px) {
  .movie-view {
    margin: 20px;
    padding: 20px;
  }
}
</style>
