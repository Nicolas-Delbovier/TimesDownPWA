<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { deckService } from '../services/deckService';
import { gameService } from '../services/gameService';

// Import components using defineAsyncComponent for potential performance benefits
const NavBar = defineAsyncComponent(() => import('../components/NavBar.vue'));
const ThemesSelection = defineAsyncComponent(() => import('./ThemesSelection.vue'));
const Play = defineAsyncComponent(() => import('./Play.vue'));

const emit = defineEmits(['startGame']);

const contentView = ref('play');
const decks = ref([]);

onMounted(() => {
  decks.value = deckService.getDecks();
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
  const words = gameService.prepareGameWords(decks.value, nbCardsToPlay.value);
  if (words) {
    emit('startGame', { words, nbTeams: nbTeams.value });
  }
};

const changeMenuView = (message) => {
  contentView.value = message;
};

const updateSelectedThemes = (message) => {
  const deck = decks.value.find((d) => d.title === message.title);
  if (deck) {
    deck.use = message.use;
    deckService.saveDecks(decks.value);
  }
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
      class="no-scrollbar w-full overflow-y-scroll"
    />
  </div>
  <NavBar @menuViewChange="changeMenuView" height="25" width="25" />
</template>

<style scoped></style>
