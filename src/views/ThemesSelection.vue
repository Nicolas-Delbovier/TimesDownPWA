<script setup>
import ThemeCard from '@/components/ThemeCard.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['decks', 'selectedThemes']);
const emit = defineEmits(['useTheme']);
</script>

<template>
    <div id="main">
        <div v-for="deck in decks" :key="deck.theme">
            <ThemeCard @useTheme="emit('useTheme', $event)" :theme="deck.theme" :numberWords="deck.words.length"
                :isUsed="selectedThemes[deck.theme]" />
        </div>
    </div>
</template>

<style scoped>
#main {
    text-align: center;
    background: rgb(188, 230, 188);
    background-color: var(--color-3);
}
</style>