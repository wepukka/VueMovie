<script setup>
import { apiFetchMovieById, apiDeleteMovie } from '../../api'
import EditMovie from '@/components/EditMovie.vue'
</script>

<template>
  <EditMovie v-if="editing" :movie="movie" @stopEditing="stopEditProcess()" />
  <div class="movie-flex-container" v-else>
    <div class="delete-pop-up" v-if="deleting">
      <p>Are you sure you want to delete</p>
      <p>
        <span>{{ movie.title }} </span> ?
      </p>
      <v-btn class="pos act-button" @click="deleteMovie()">yes</v-btn>
      <v-btn class="neg act-button" @click="stopDeleteProcess()">no</v-btn>
    </div>
    <div class="movie-data-container" v-else>
      <h1>{{ movie.title }}</h1>
      <div class="details">
        <p>{{ movie.year }}</p>
        <p>{{ movie.genre }}</p>
      </div>
      <div class="lore-container">
        <h2>Lore</h2>
        <p class="lore">{{ movie.lore !== '' ? movie.lore : 'This movie is missing lore!' }}</p>
      </div>
    </div>
    <div class="movie-action-container" v-if="editing === false && deleting === false">
      <v-btn class="pos act-button" @click="startEditProcess()">Edit</v-btn>
      <v-btn class="neg act-button" @click="startDeleteProcess()">Delete</v-btn>
    </div>
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
p {
  border-radius: 10px;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 5px;
}
.movie-flex-container {
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.movie-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.movie-data-container h1,
p:not(.lore) {
  text-transform: capitalize;
}

h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.details {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  text-align: center;
}

.details p {
  padding: 5px;
  width: 80px;
  font-size: 18px;
  margin: 5px 0;
  border: 1px solid var(--text);
}

.lore-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.lore {
  font-style: italic;
  color: #555;
}
.delete-pop-up {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  gap: 10px;
}

.delete-pop-up button {
  width: 150px;
}

.delete-pop-up span {
  font-weight: bold;
}
/* Action buttons start */
.movie-action-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.pos {
  background-color: green;
}
.neg {
  background-color: rgb(192, 44, 44);
}

.act-button {
  opacity: 0.8;
}
.act-button:hover {
  opacity: 1;
}
/* Action buttons end */

@media (min-width: 600px) {
  .movie-flex-container {
    padding: 50px;
  }
}
</style>
