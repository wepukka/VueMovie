<script setup>
import { ref, onMounted } from 'vue'
import { apiUpdateMovie } from '../../api.js'

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
