<script setup>
import { inject } from 'vue';
import ThemeCard from '@/components/ThemeCard.vue';

const props = defineProps(['decks', 'selectedThemes']);
const emit = defineEmits(['useTheme']);

const triggerEditTheme = inject('triggerEditTheme');
</script>

<template>
  <div id="themes-selection-menu" class="flex flex-col items-center gap-5 mt-5">
    <ThemeCard
      v-for="deck in decks"
      :key="deck.theme"
      @useTheme="emit('useTheme', $event)"
      :theme="deck.theme"
      :numberWords="deck.words.length"
      :isUsed="selectedThemes[deck.theme]"
    />

    <button
      class="border-2 border-dashed border-text-color grid grid-rows-[1fr_auto] justify-items-center items-center text-text-color cursor-pointer p-4 rounded-2xl w-11/12 gap-2"
      @click="triggerEditTheme('New')"
    >
      <p class="text-center text-lg font-bold">Nouveau Thème</p>
      <img
        alt="Plus Icon"
        src="/assets/plus.svg"
        width="30"
        height="30"
        class="brightness-0 invert"
      />
    </button>
  </div>
</template>

<style scoped></style>
