<script setup>
// api //
import { apiAddMovie } from '../../api'
import ErrorMsg from '@/components/ErrorMsg.vue'
</script>

<template>
  <h1>Add Movie</h1>
  <p>Contribute to MovieDb by adding new movies</p>
  <div class="fields-container">
    <v-text-field v-model="movie.title" label="Title *" hide-details="auto"></v-text-field>
    <v-text-field
      v-model="movie.year"
      label="Year *"
      hide-details="auto"
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength );"
      type="number"
      maxlength="4"
      hide-spin-buttons
    ></v-text-field>
    <v-select v-model="movie.genre" :items="genres" label="Genre *"></v-select>
    <v-textarea v-model="movie.lore" label="Lore (optional)"></v-textarea>
    <v-btn block @click="addMovie(movie)">Add movie</v-btn>
  </div>
  <div class="pop-up-msg">
    <p v-if="success">
      Thanks for adding <span>{{ static_title }} </span> to our database!!
    </p>
    <ErrorMsg v-if="isError" :errorMsg="errorMsg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      genres: ['Drama', 'Fiction', 'Documentary'],
      movie: {
        title: '',
        year: '',
        genre: '',
        lore: ''
      },
      static_title: '',
      success: false,
      isError: false,
      errorMsg: ''
    }
  },
  methods: {
    async addMovie(movie) {
      this.isError = false
      this.success = false

      if (movie.title === '' || (movie.year === '') | (movie.genre === '')) {
        this.isError = true
        return (this.errorMsg = '* Title, Year and Genre is required')
      }

      let response = await apiAddMovie(movie)
      if (response.payload.success) {
        this.static_title = movie.title
        this.success = true
        movie.title = ''
        movie.year = ''
        movie.genre = ' '
        movie.lore = ' '
      } else {
        this.isError = true
        return (this.errorMsg = response.payload.errorMsg)
      }
    }
  }
}
</script>

<style scoped>
h1,
p {
  text-align: center;
  margin-bottom: 10px;
}

.fields-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  border-radius: 10px;
}

.pop-up-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
}
.pop-up-msg span {
  font-weight: bold;
}
</style>
