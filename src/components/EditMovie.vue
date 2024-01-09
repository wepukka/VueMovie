<script setup>
defineEmits(['stopEditing'])
</script>

<template>
  <v-text-field v-model="newMovie.title" label="Edit title" hide-details="auto"></v-text-field>
  <v-text-field v-model="newMovie.year" label="Edit year" hide-details="auto"></v-text-field>
  <v-select v-model="newMovie.genre" :items="genres" label="Genre"></v-select>
  <v-btn block>Edit</v-btn>
  <v-btn block @click="stopEdit()">Cancel</v-btn>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  data() {
    return {
      genres: ['Drama', 'Fiction', 'Documentary'],
      newMovie: {}
    }
  },
  methods: {
    stopEdit() {
      this.$emit('stopEditing')
    }
  },

  mounted() {
    this.newMovie = this.movie
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
