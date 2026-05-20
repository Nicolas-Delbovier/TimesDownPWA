<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue';
import GameHeading from '@/components/GameHeading.vue';

const emit = defineEmits(['backToMenu']);
const props = defineProps(['nbTeams', 'words']);

const round = ref(1);
const state = ref('inter-round');
const currentWords = ref([...props.words].sort(() => 0.5 - Math.random()));
const currentWordIndex = ref(0);
const currentTeam = ref(0);
const scores = reactive(Array(props.nbTeams).fill(0));

// Timer constants and state
const TIME = 30;
const remainingTime = ref(TIME);
const timerId = ref(null); // Holds the reference to our single active interval

const DISABLED_BUTTON_DURATION_MS = 2000;
const isNextTeamButtonDisabled = ref(true);
const isScoresButtonDisabled = ref(true);

// Keep timeouts only for the UI button debouncing, tracked cleanly
const uiTimeoutIds = ref([]);

const roundTypeLabel = computed(() => {
  switch (round.value) {
    case 1:
      return 'Mots interdits';
    case 2:
      return 'Mot unique';
    case 3:
      return 'Mime';
  }
});

const winnerTeamIndex = computed(() => {
  return scores.indexOf(Math.max(...scores));
});

// Cleanly stops the countdown and resets the interval placeholder
const stopTimer = () => {
  if (timerId.value) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
};

const startRound = () => {
  showTeamTurn(false);
  currentWords.value = [...props.words].sort(() => 0.5 - Math.random());
};

const showTeamTurn = (nextTeam = true) => {
  if (nextTeam) {
    currentTeam.value = (currentTeam.value + 1) % props.nbTeams;
  }
  state.value = 'next-team';
  isNextTeamButtonDisabled.value = true;
  const timeoutId = setTimeout(() => {
    isNextTeamButtonDisabled.value = false;
  }, DISABLED_BUTTON_DURATION_MS);
  uiTimeoutIds.value.push(timeoutId);
};

const nextRound = () => {
  round.value++;
  showTeamTurn(true);
};

const showScores = () => {
  isScoresButtonDisabled.value = true;
  state.value = 'scores';
  const timeoutId = setTimeout(
    () => (isScoresButtonDisabled.value = false),
    DISABLED_BUTTON_DURATION_MS
  );
  uiTimeoutIds.value.push(timeoutId);
};

const skipWord = () => {
  currentWordIndex.value = (currentWordIndex.value + 1) % currentWords.value.length;
};

const validateWord = () => {
  scores[currentTeam.value]++;
  currentWords.value.splice(currentWordIndex.value, 1);
  currentWordIndex.value = Math.min(
    currentWordIndex.value,
    Math.max(currentWords.value.length - 1, 0)
  );

  // When we are at the end of the round
  if (currentWords.value.length === 0) {
    currentWords.value = [...props.words];
    stopTimer(); // Turn off the timer since the round ended early!
    showScores();
    remainingTime.value = TIME;
  }
};

const startTimer = () => {
  // Ensure any lingering timer is cleared before starting a new one
  stopTimer();
  remainingTime.value = TIME;

  const timerStartRound = round.value;

  timerId.value = setInterval(() => {
    remainingTime.value--;

    if (remainingTime.value <= 0) {
      stopTimer();

      // Only trigger team change if the round hasn't changed mid-way
      // TODO: ensure this code is still usefull ?
      if (timerStartRound === round.value) {
        currentTeam.value = (currentTeam.value + 1) % props.nbTeams;
        currentWordIndex.value = (currentWordIndex.value + 1) % currentWords.value.length;
        showTeamTurn(false);
      }

      remainingTime.value = TIME;
    }
  }, 1000);
};

const startNextTeamTurn = () => {
  startTimer();
  state.value = 'inside-round';
};

const backToMenu = () => {
  emit('backToMenu', null);
};

// Lifecycle cleanup
onBeforeUnmount(() => {
  stopTimer();
  uiTimeoutIds.value.forEach(clearTimeout);
});
</script>

<template>
  <div
    v-if="state === 'inter-round'"
    class="flex flex-col items-center justify-between h-full text-text-color"
  >
    <GameHeading :round="round" :round-type-label="roundTypeLabel" @homeBtnClick="backToMenu" />
    <div class="bg-accent-color/20 p-4 rounded-xl font-medium">
      <span v-if="round === 1">
        L'objectif est de faire deviner le mot cible à votre équipe en utilisant autant de mots que
        vous le souhaitez. La seule contrainte est de ne pas utiliser de mots qui ont une sonorité
        similaire au mot à deviner (par exemple, pour faire deviner "livre", évitez "livret"). Votre
        équipe a un nombre illimité de tentatives pour deviner le mot. Cependant, il est interdit de
        passer une carte et le mime n'est pas autorisé.
      </span>
      <span v-if="round === 2">
        Pour cette manche, vous disposez d'un seul mot pour faire deviner le mot cible à votre
        équipe. Si votre équipe ne devine pas correctement, la carte doit être passée.
      </span>
      <span v-if="round === 3">
        Ici, seul le mime est autorisé pour faire deviner le mot cible. A nouveau, votre équipe n'a
        droit qu'à une seule proposition par carte.
      </span>
    </div>

    <button
      class="bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80 cursor-pointer font-bold py-6 px-18 rounded-xl mb-16"
      @click="startRound"
    >
      COMPRIS !
    </button>
  </div>

  <div
    v-if="state === 'next-team'"
    class="flex flex-col items-center justify-between h-full text-text-color"
  >
    <GameHeading :round="round" :round-type-label="roundTypeLabel" @homeBtnClick="backToMenu" />
    <div class="bg-accent-color/20 font-medium py-6 px-18 rounded-xl">
      Tour de l'équipe {{ currentTeam + 1 }}.
    </div>
    <button
      :disabled="isNextTeamButtonDisabled"
      class="cursor-pointer font-bold py-6 px-18 rounded-xl mb-16"
      :class="{
        'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
          !isNextTeamButtonDisabled,
        'bg-primary-color/20 hover:bg-primary-color/10 active:bg-primary-color/10':
          isNextTeamButtonDisabled,
      }"
      @click="startNextTeamTurn"
    >
      Jouer
    </button>
  </div>

  <div
    v-if="state === 'inside-round'"
    class="flex flex-col items-center justify-between h-full text-text-color"
  >
    <GameHeading :round="round" :round-type-label="roundTypeLabel" @homeBtnClick="backToMenu" />
    <div id="current-word" class="bg-accent-color/60 font-medium py-12 px-18 rounded-xl">
      {{ currentWords[currentWordIndex] }}
    </div>
    <div>{{ remainingTime }} secondes</div>
    <div id="action-buttons" class="flex flex-row gap-4 justify-evenly">
      <button
        class="cursor-pointer font-bold py-6 px-12 rounded-xl mb-16 bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10"
        @click="skipWord"
      >
        Passer
      </button>
      <button
        class="cursor-pointer font-bold py-6 px-12 rounded-xl mb-16 bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80"
        @click="validateWord"
      >
        Valider
      </button>
    </div>
  </div>

  <div
    v-if="state === 'scores'"
    class="flex flex-col items-center justify-between h-full text-text-color"
  >
    <GameHeading :round="round" :round-type-label="roundTypeLabel" @homeBtnClick="backToMenu" />

    <div class="rounded-lg overflow-hidden shadow-md" id="example-table">
      <div class="bg-accent-color/60 flex">
        <div class="px-4 py-2 font-semibold">Equipe</div>
        <div class="px-4 py-2 font-semibold">Score</div>
      </div>
      <div
        class="flex bg-accent-color/20 justify-center"
        v-for="(score, index) in scores.slice(0, nbTeams)"
        :key="index"
      >
        <div
          :class="{ 'bg-primary-color/40': index === winnerTeamIndex }"
          class="w-full px-4 py-2 text-center"
        >
          {{ index + 1 }}
        </div>
        <div
          :class="{ 'bg-primary-color/40': index === winnerTeamIndex }"
          class="w-full px-4 py-2 border-l-1 border-text-color text-center"
        >
          {{ score }}
        </div>
      </div>
    </div>

    <button
      v-if="round < 3"
      :disabled="isScoresButtonDisabled"
      class="cursor-pointer font-bold py-6 px-18 rounded-xl mb-16"
      :class="{
        'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
          !isScoresButtonDisabled,
        'bg-primary-color/20 hover:bg-primary-color/10 active:bg-primary-color/10':
          isScoresButtonDisabled,
      }"
      @click="nextRound"
    >
      CONTINUER
    </button>

    <button
      v-if="round >= 3"
      :disabled="isScoresButtonDisabled"
      class="cursor-pointer font-bold py-6 px-18 rounded-xl mb-16"
      :class="{
        'bg-primary-color hover:bg-primary-color/80 active:bg-primary-color/80':
          !isScoresButtonDisabled,
        'bg-primary-color/20 hover:bg-primary-color/10 active:bg-primary-color/10':
          isScoresButtonDisabled,
      }"
      @click="backToMenu"
    >
      RETOUR AU MENU
    </button>
  </div>
</template>

<style scoped></style>
