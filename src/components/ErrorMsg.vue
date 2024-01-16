<script setup></script>

<template>
  <div>{{ errorMsg }}</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    errorMsg: String
  }
}
</script>

<style scoped>
div {
  margin-top: 20px;
  text-align: center;
  font-weight: 700;
}
</style>
