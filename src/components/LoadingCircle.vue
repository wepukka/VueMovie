<template>
  <div></div>
</template>

<style scoped>
div {
  height: 30px;
  width: 30px;
  border-radius: 20px;
  border-bottom: 3px solid var(--text);
  border-right: 3px solid var(--text);

  animation: rotate 750ms infinite;
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
