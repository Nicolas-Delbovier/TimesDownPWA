<script setup>
import ThemeCard from '@/components/ThemeCard.vue';

const props = defineProps(['decks', 'selectedThemes']);
const emit = defineEmits(['useTheme']);
</script>

<template>
  <div id="themes-selection-menu" class="flex flex-col items-center gap-5">
    <template v-for="deck in decks" :key="deck.theme">
      <ThemeCard
        @useTheme="emit('useTheme', $event)"
        :theme="deck.theme"
        :numberWords="deck.words.length"
        :isUsed="selectedThemes[deck.theme]"
      />
    </template>
  </div>
</template>

<style scoped></style>
