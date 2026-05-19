<script setup>
defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
  text: {
    type: String,
    default: '',
  },
  iconBackgroundClass: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <button class="flex flex-col items-center justify-between gap-3">
    <div class="rounded-4xl px-4 py-1" :class="iconBackgroundClass">
      <img alt="NavBar icon" :src="imgSrc" :width="width" :height="height" />
    </div>
    <span class="text-text-color">{{ text }}</span>
  </button>
</template>

<style scoped>
.icon {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(70deg) brightness(104%) contrast(104%);
}
</style>
