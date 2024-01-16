<script setup>
// Helpers
import { movieDataIsValid } from '../helpers/movieHelpers'

// Utils
import { openInNewTab } from '../utils/browser'
// Api //
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
    <div class="add-image-container">
      <p>Add image (MAX FILE SIZE 50KB)</p>
      <input type="file" accept="image/jpeg" @change="uploadImage" />
      <button @click="openInNewTab('https://imagecompressor.io/compress-to-exact-size')">
        Compress Images
      </button>
      <img :src="movie.image" />
    </div>
    <v-btn block style="color: var(--pos)" @click="addMovie(movie)">Add movie</v-btn>
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
        lore: '',
        image: null
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

      let isValid = movieDataIsValid({
        title: movie.title,
        year: movie.year,
        genre: movie.genre
      })

      if (!isValid.success) {
        this.isError = true
        return (this.errorMsg = isValid.errorMsg)
      }

      let response = await apiAddMovie(movie)
      if (response.payload.success) {
        ;(this.static_title = movie.title), (this.success = true), (movie.title = '')
        movie.year = ''
        movie.genre = ' '
        movie.lore = ' '
        return (this.success = true)
      } else {
        this.isError = true
        this.errorMsg = response.payload.errorMsg
      }
    },
    uploadImage(e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        console.log(e.target.result)
        this.movie.image = e.target.result
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

.add-image-container > * {
  display: block;
  margin-top: 20px;
  text-align: left;
}

.add-image-container > button {
  padding: 5px;

  border: 1px solid black;
  background-color: rgb(240, 240, 240);
}

img {
  max-height: 200px;
  max-width: 200px;
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
