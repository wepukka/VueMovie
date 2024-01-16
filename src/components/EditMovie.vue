<script setup>
import { ref, onMounted } from 'vue'

// Helpers
import { movieDataIsValid } from '@/helpers/movieHelpers'
// API //
import { apiUpdateMovie } from '../../api'
// Components
import ErrorMsg from './ErrorMsg.vue'

// EMIT //
defineEmits(['stopEditing', 'startUpdate'])
// PROPS //

let props = defineProps({
  movie: Object
})
// REF //
let newMovie = ref({})
// LifeCycle //
onMounted(() => {
  newMovie.value = { ...props.movie } // Create a shallow copy, it wont update parents movie object!!  //
})

// Methods //
const uploadImage = (e) => {
  const image = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (e) => {
    newMovie.value.image = e.target.result
  }
}
</script>

<template>
  <div class="edit-container">
    <v-text-field v-model="newMovie.title" label="Title" hide-details="auto"></v-text-field>
    <v-text-field
      v-model="newMovie.year"
      label="Year"
      hide-details="auto"
      hide-spin-buttons
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
      type="number"
      maxlength="4"
    ></v-text-field>
    <v-select v-model="newMovie.genre" :items="genres" label="Genre"></v-select>
    <v-textarea v-model="newMovie.lore" label="Lore"></v-textarea>
    <v-btn style="color: var(--pos)" block @click="updateMovie(newMovie)">Edit</v-btn>
    <v-btn style="color: var(--neg)" block @click="stopEdit()">Cancel</v-btn>
    <ErrorMsg v-if="isError" :errorMsg="errorMsg" />

    <div class="add-image-container">
      <p>Add image (MAX FILE SIZE 50KB)</p>
      <a href="https://imagecompressor.io/compress-to-exact-size">COMPRESS IMAGES</a>
      <input type="file" accept="image/jpeg" v-on:change="uploadImage" />
    </div>
    <img :src="newMovie.image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      genres: ['Drama', 'Fiction', 'Documentary'],
      isError: false,
      errorMsg: ''
    }
  },
  methods: {
    stopEdit() {
      this.$emit('stopEditing')
    },
    async updateMovie(newMovie) {
      this.isError = false
      let isValid = movieDataIsValid({
        title: newMovie.title,
        year: newMovie.year,
        genre: newMovie.genre
      })

      if (!isValid.success) {
        this.isError = true
        return (this.errorMsg = isValid.errorMsg)
      }

      let updateMovie = await apiUpdateMovie(newMovie)
      if (updateMovie.payload.success) {
        this.$emit('startUpdate')
      } else {
        this.errorMsg = updateMovie.payload.errorMsg
      }
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 10px;
  opacity: 0.8;
}

button:hover {
  opacity: 1;
}

.add-image-container {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 10px 0px 10px 0px;
}

img {
  max-width: 200px;
  max-height: 200px;
}
</style>
