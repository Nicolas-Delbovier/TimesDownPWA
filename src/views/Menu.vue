<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { deckService } from '../services/deckService';

// Import components using defineAsyncComponent for potential performance benefits
const NavBar = defineAsyncComponent(() => import('../components/NavBar.vue'));
const ThemesSelection = defineAsyncComponent(() => import('./ThemesSelection.vue'));
const Play = defineAsyncComponent(() => import('./Play.vue'));

const emit = defineEmits(['startGame']);

const contentView = ref('play');
const decks = ref([]);
const selectedThemes = ref({});

onMounted(() => {
  decks.value = deckService.getDecks();
  selectedThemes.value = decks.value.reduce((acc, deck) => {
    acc[deck.theme] = true;
    return acc;
  }, {});
});
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
  emit('startGame', { words: allWords.slice(0, nbCardsToPlay.value), nbTeams: nbTeams.value });
};

const changeMenuView = (message) => {
  contentView.value = message;
};

const updateSelectedThemes = (message) => {
  selectedThemes.value[message.theme] = message.use;
};
</script>

<template>
  <div id="menu" class="overflow-scroll no-scrollbar flex-grow flex flex-col">
    <Play
      @playButtonPressed="startGame"
      :nbCards="nbCardsToPlay"
      :nbTeams="nbTeams"
      @updateNbCards="updateNbCards"
      @updateNbTeams="updateNbTeams"
      v-if="contentView === 'play'"
      class="no-scrollbar w-full overflow-y-scroll"
    />
    <ThemesSelection
      @useTheme="updateSelectedThemes"
      v-if="contentView === 'themes'"
      :decks="decks"
      :selectedThemes="selectedThemes"
      class="no-scrollbar w-full overflow-y-scroll"
    />
  </div>
  <NavBar @menuViewChange="changeMenuView" height="25" width="25" />
</template>

<style scoped></style>
