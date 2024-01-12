<script setup>
import { ref } from 'vue'

// Emit
defineEmits(['fetchWithFilters'])

// Props
const props = defineProps({
  filters: Object
})

// REF //
let filters = ref(props.filters)
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
    <v-select v-model="filters.genre" :items="genres" label="Filter By Genre">
      <template #selection="{ item }">
        <v-chip class="v-chip" v-if="this.filters.genre !== ''">
          {{ item.title }}
        </v-chip>
      </template>
    </v-select>
    <v-btn block style="color: var(--neg)" @click="clearFilters(filters)">Clear Filters</v-btn>
    <v-btn block style="color: var(--pos)" @click="fetch(filters)">Search</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genres: ['Drama', 'Fiction', 'Documentary']
    }
  },
  methods: {
    fetch(filters) {
      this.$emit('pushQueryAndReload', filters)
    },
    deleteItem(item) {
      this.filters.genre = this.filters.genre.filter((find) => find !== item)
    },
    clearFilters() {
      ;(this.filters.genre = ''), (this.filters.title = ''), (this.filters.year = '')
    }
  }
}
</script>

<style scoped>
.v-chip {
  display: flex;

  background-color: var(--item-background);
}
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

v-chip {
  background-color: red;
}
</style>
