<script setup>
// Api
import { apiFetchMovieById, apiDeleteMovie } from '../../api'
// Components
import MovieCard from '@/components/MovieCard.vue'
import EditMovie from '@/components/EditMovie.vue'
import DeleteMovie from '@/components/DeleteMovie.vue'
</script>

<template>
  <div class="movie-view">
    <DeleteMovie
      v-if="deleting"
      :movie="movie"
      @stopDeleteProcess="stopDeleteProcess()"
      @deleteMovie="deleteMovie()"
    />
    <EditMovie v-else-if="editing" :movie="movie" @stopEditing="stopEditProcess()" />
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
      loading: true,
      deleting: false,
      editing: false
    }
  },
  methods: {
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
      let tryDelete = await apiDeleteMovie(this.movie._id)
      if (tryDelete.payload.success) {
        this.$router.push({ name: 'home' })
      } else {
        window.alert('Something went wrong')
      }
    },
    async fetchMovieById() {
      let movie = await apiFetchMovieById(this.$route.params.id)
      if (movie.payload.success) {
        this.movie = movie.payload.data
        this.loading = false
      } else {
        this.success = false
        this.loading = false
      }
    }
  },
  async mounted() {
    this.fetchMovieById()
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

@media (min-width: 600px) {
  .movie-view {
    margin: 20px;
    padding: 20px;
  }
}
</style>
