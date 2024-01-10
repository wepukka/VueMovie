<script setup>
import { ref, onMounted } from 'vue'

// API
import { apiUpdateMovie } from '../../api.js'

// Components
import ErrorMsg from './ErrorMsg.vue'

// EMIT //
defineEmits(['stopEditing'])

// PROPS //
const props = defineProps({
  movie: Object
})

// REF //
let newMovie = ref({})

// LIFE CYCLE //
onMounted(() => {
  newMovie.value = props.movie
})
</script>

<template>
  <v-text-field v-model="newMovie.title" label="Edit title" hide-details="auto"></v-text-field>
  <v-text-field
    v-model="newMovie.year"
    label="Edit year"
    hide-details="auto"
    hide-spin-buttons
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    type="number"
    maxlength="4"
  ></v-text-field>
  <v-select v-model="newMovie.genre" :items="genres" label="Genre"></v-select>
  <v-textarea v-model="newMovie.lore" label="Lore"></v-textarea>
  <v-btn block @click="updateMovie(newMovie)">Edit</v-btn>
  <v-btn block @click="stopEdit()">Cancel</v-btn>
  <ErrorMsg v-if="isError" :errorMsg="errorMsg" />
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
    getCurrYear() {
      let d = new Date().getFullYear()
      return d
    },

    async updateMovie(newMovie) {
      this.isError = false
      if (
        newMovie.title === '' ||
        (newMovie.genre === '') |
          (newMovie.year === '') |
          !(parseInt(newMovie.year) >= 1888) |
          !(parseInt(newMovie.year) <= this.getCurrYear() + 1)
      ) {
        this.isError = true
        return (this.errorMsg = `* Title, Year and Genre is required, Year must be between 1888 and ${
          this.getCurrYear() + 1
        } `)
      }
      let updateMovie = await apiUpdateMovie(newMovie)
      if (updateMovie.payload.success) {
        this.stopEdit()
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
button:first-of-type {
  background-color: rgba(0, 128, 0);
}
button:last-of-type {
  background-color: rgba(255, 0, 0);
}

button:hover {
  opacity: 1;
}
</style>
