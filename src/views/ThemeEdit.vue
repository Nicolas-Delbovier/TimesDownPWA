<script setup>
import { ref } from 'vue';

const emit = defineEmits(['backToMenu']);
const props = defineProps(['title']);

const backToMenu = () => {
  emit('backToMenu', null);
};
</script>

<template>
  <div id="edit-theme">
    <p>{{ title }}</p>
    <button @click="backToMenu">Back to menu</button>
  </div>
</template>

<style scoped></style>
