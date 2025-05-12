<script setup>
import { ref, reactive, computed, defineAsyncComponent, defineEmits } from 'vue';
import jsonData from '../../data/data.json';

// Import components using defineAsyncComponent for potential performance benefits
const NavBar = defineAsyncComponent(() => import('../components/NavBar.vue'));
const ThemesSelection = defineAsyncComponent(() => import('./ThemesSelection.vue'));
const Modifications = defineAsyncComponent(() => import('./Modifications.vue'));
const Play = defineAsyncComponent(() => import('./Play.vue'));

const emit = defineEmits(['startGame']);

const contentView = ref('play');
const decks = ref(jsonData.decks);
const selectedThemes = ref(
    jsonData.decks.reduce((acc, deck) => {
        acc[deck.theme] = true;
        return acc;
    }, {})
);
const nbCardsToPlay = ref(30);
const nbTeams = ref(2);

const updateNbCards = (message) => {
    nbCardsToPlay.value = message;
};

const updateNbTeams = (message) => {
    nbTeams.value = message;
};

const startGame = () => {
    let allWords = [];
    for (const deck of decks.value) {
        if (selectedThemes.value[deck.theme]) {
            allWords = allWords.concat(deck.words);
        }
    }
    allWords.sort(() => 0.5 - Math.random());
    allWords = allWords.slice(0, nbCardsToPlay.value);
    emit('startGame', { words: allWords, nbTeams: nbTeams.value });
};

const changeMenuView = (message) => {
    contentView.value = message;
};

const updateSelectedThemes = (message) => {
    selectedThemes.value[message.theme] = message.use;
};
</script>

<template>
    <div id="menu">
        <Play @playButtonPressed="startGame" :nbCards="nbCardsToPlay" :nbTeams="nbTeams" @updateNbCards="updateNbCards"
            @updateNbTeams="updateNbTeams" v-if="contentView === 'play'" class="content" />
        <ThemesSelection @useTheme="updateSelectedThemes" v-if="contentView === 'themes'" :decks="decks"
            :selectedThemes="selectedThemes" class="content" />
        <Modifications v-if="contentView === 'modifications'" class="content" />
        <NavBar @menuViewChange="changeMenuView" class="nav" height="50" width="50" />
    </div>
</template>

<style scoped>
#menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-3);
    min-width: 75vw;
}

.nav {
    width: 75vw;
    position: sticky;
    bottom: 30px;
    margin: auto;
    margin-top: 20px;
}
</style>