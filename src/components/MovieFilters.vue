<script setup>
defineEmits(['fetchWithFilters'])
</script>

<template>
  <div class="container">
    <v-text-field
      v-model="filters.title"
      label="Filter By Title"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="filters.year"
      label="Filter By Year"
      hide-details="auto"
      hide-spin-buttons
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
      type="number"
      maxlength="4"
    ></v-text-field>
    <v-select
      ref="myVSelect"
      class="test"
      v-model="filters.genre"
      :items="genres"
      label="Filter By Genre"
      chips
    ></v-select>
    <v-btn block @click="fetch(filters)">Search</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genres: ['Drama', 'Fiction', 'Documentary'],
      filters: {
        genre: '',
        year: '',
        title: ''
      }
    }
  },
  methods: {
    fetch(filters) {
      this.$emit('pushQueryAndReload', filters)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
