<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['nbTeams', 'nbCards']);
const emit = defineEmits(['playButtonPressed', 'updateNbCards', 'updateNbTeams']);

const localNbTeams = ref(props.nbTeams);
const localNbCards = ref(props.nbCards);

const emitPressPlayMessage = () => {
  emit('playButtonPressed', 'playButtonPressed');
};

const updateNbCards = (number) => {
  localNbCards.value = number;
  emit('updateNbCards', number);
};

const updateNbTeams = (number) => {
  localNbTeams.value = number;
  emit('updateNbTeams', number);
};

// Use watch to keep local state in sync with props if they change from the parent
watch(
  () => props.nbTeams,
  (newNbTeams) => {
    localNbTeams.value = newNbTeams;
  }
);

watch(
  () => props.nbCards,
  (newNbCards) => {
    localNbCards.value = newNbCards;
  }
);
</script>

<template>
  <div class="flex flex-col items-center justify-between gap-5 flex-grow my-10">
    <div class="flex flex-col items-center justify-center gap-5 w-full">
      <h3 class="text-text-color font-bold">Nombre de cartes</h3>
      <div class="flex flex-row justify-between w-full">
        <button
          v-for="nb in [15, 30, 45]"
          :key="nb"
          @click="updateNbCards(nb)"
          class="btn btn-interactive text-text-color w-20 h-10 rounded-4xl"
          :class="localNbCards === nb ? 'btn-primary' : 'bg-accent-color/20'"
        >
          {{ nb }}
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-5 w-full">
      <h3 class="text-text-color font-bold">Nombre d'équipes</h3>
      <div class="flex flex-row justify-between w-full">
        <button
          v-for="nb in [2, 3, 4]"
          :key="nb"
          @click="updateNbTeams(nb)"
          class="btn btn-interactive text-text-color w-20 h-10 rounded-4xl"
          :class="localNbTeams === nb ? 'btn-primary' : 'bg-accent-color/20'"
        >
          {{ nb }}
        </button>
      </div>
    </div>

    <button
      class="btn btn-primary btn-interactive py-6 px-18"
      id="start-game-button"
      @click="emitPressPlayMessage"
    >
      JOUER
    </button>
  </div>
</template>

<style scoped></style>
