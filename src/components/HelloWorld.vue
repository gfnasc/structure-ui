<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>