<template>
  <button>
    {{ msg }}
  </button>
</template>

<script>
export default {
  name: 'DefaultButton',
  props: {
    msg: {
      msg: String,
      required: true
    },
    onclick: {
      onclick: Function,
      required: true
    },
    icon: {
      icon: Element,
      required: false
    }
  }
}
</script>

<style scoped>
button {
  background-color: var(--item-background);
  color: var(--text);
  border: none;
  height: 100%;
  width: 100%;
  min-width: 80px;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 200ms;
}
button:hover {
  background-color: var(--item-background-hover);
}
</style>
