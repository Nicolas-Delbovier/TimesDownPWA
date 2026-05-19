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
  <div class="play-menu flex flex-col items-center justify-between gap-5 flex-grow mt-15">
    <div class="flex flex-col items-center justify-center gap-5 w-full">
      <h3 class="text-text-color font-bold">Nombre de cartes</h3>
      <div class="flex flex-row justify-between w-full">
        <button
          @click="updateNbCards(15)"
          :class="{
            'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
              localNbCards === 15,
            'bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10':
              localNbCards !== 15,
          }"
          class="text-text-color cursor-pointer w-20 h-10 rounded-4xl"
        >
          15
        </button>
        <button
          @click="updateNbCards(30)"
          :class="{
            'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
              localNbCards === 30,
            'bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10':
              localNbCards !== 30,
          }"
          class="text-text-color cursor-pointer w-20 h-10 rounded-4xl"
        >
          30
        </button>
        <button
          @click="updateNbCards(45)"
          :class="{
            'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
              localNbCards === 45,
            'bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10':
              localNbCards !== 45,
          }"
          class="text-text-color cursor-pointer w-20 h-10 rounded-4xl"
        >
          45
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-5 w-full">
      <h3 class="text-text-color font-bold">Nombre d'équipes</h3>
      <div class="flex flex-row justify-between w-full">
        <button
          @click="updateNbTeams(2)"
          :class="{
            'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
              localNbTeams === 2,
            'bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10':
              localNbTeams !== 2,
          }"
          class="text-text-color cursor-pointer w-20 h-10 rounded-4xl"
        >
          2
        </button>
        <button
          @click="updateNbTeams(3)"
          :class="{
            'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
              localNbTeams === 3,
            'bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10':
              localNbTeams !== 3,
          }"
          class="text-text-color cursor-pointer w-20 h-10 rounded-4xl"
        >
          3
        </button>
        <button
          @click="updateNbTeams(4)"
          :class="{
            'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
              localNbTeams === 4,
            'bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10':
              localNbTeams !== 4,
          }"
          class="text-text-color cursor-pointer w-20 h-10 rounded-4xl"
        >
          4
        </button>
      </div>
    </div>

    <button
      class="bg-primary-color text-text-color hover:bg-primary-color/80 active:bg-primary-color/80 cursor-pointer font-bold py-6 px-18 rounded-xl"
      id="start-game-button"
      @click="emitPressPlayMessage"
    >
      JOUER
    </button>
  </div>
</template>

<style scoped></style>
