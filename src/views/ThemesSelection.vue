<script setup>
import ThemeCard from '@/components/ThemeCard.vue';

const props = defineProps(['decks', 'selectedThemes']);
const emit = defineEmits(['useTheme']);
</script>

<template>
  <div id="themes-selection-menu" class="flex flex-col items-center gap-5">
    <ThemeCard
      v-for="deck in decks"
      :key="deck.theme"
      @useTheme="emit('useTheme', $event)"
      :theme="deck.theme"
      :numberWords="deck.words.length"
      :isUsed="selectedThemes[deck.theme]"
    />
    <button
      class="border border-dashed border-2 flex flex-col items-center text-text-color cursor-pointer px-2 pt-2 pb-4 gap-2 rounded-2xl w-11/12"
    >
      Nouveau Thème
    </button>
  </div>
</template>

<style scoped></style>
