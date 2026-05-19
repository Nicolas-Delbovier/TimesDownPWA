<script setup>
import { ref } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    required: true,
  },
  numberWords: {
    type: Number,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['useTheme']);

const use = ref(props.isUsed);

const toggleIsUsed = () => {
  use.value = !use.value;
  emit('useTheme', { theme: props.theme, use: use.value });
};
</script>

<template>
  <div
    id="theme-card"
    :class="{
      'bg-primary-color/80 active:bg-primary-color/60': use,
      'bg-accent-color/20 active:bg-accent-color/10': !use,
    }"
    class="grid grid-rows items-center text-text-color gap-4 rounded-2xl w-11/12"
  >
    <div id="content" class="mt-2">
      <p id="card-title" class="text-center text-lg font-bold">{{ theme }}</p>
    </div>

    <div id="buttons" class="grid grid-cols-[1fr_1fr] items-center h-full border-t-2">
      <button
        class="cursor-pointer flex justify-center items-center h-full py-2"
        @click="toggleIsUsed"
      >
        <img
          alt="Check Icon"
          src="/assets/check.svg"
          class="brightness-0 invert"
          width="20"
          height="20"
        />
      </button>
      <button
        class="cursor-pointer border-l-2 border-text-color flex justify-center items-center h-full py-2"
      >
        <img alt="Pen Icon" src="/assets/pen.svg" width="20" height="20" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
