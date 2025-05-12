<script setup>
import { defineProps } from 'vue';

defineProps({
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
});
</script>

<template>
  <svg :style="{ fill: color }" :width="width" :height="height">
  </svg>
</template>

<style>
/* Any global styles for SVGs could go here if needed */
</style>