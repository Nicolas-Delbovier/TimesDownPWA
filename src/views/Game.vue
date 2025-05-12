<script setup>
import { ref, reactive, computed, onBeforeUnmount, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['backToMenu']);
const props = defineProps(['nbTeams', 'words']);

const round = ref(1);
const state = ref('inter-round');
const currentWords = ref([...props.words].sort(() => 0.5 - Math.random()));
const currentWordIndex = ref(0);
const currentTeam = ref(0);
const scores = reactive(Array(4).fill(0));
const remainingTime = ref(30);
const TIME = 30;
const DISABLED_BUTTON_DURATION_SEC = 2;
const timeoutIds = ref([]);
const isNextTeamButtonDisabled = ref(true);
const isScoresButtonDisabled = ref(true);

const startRound = () => {
  nextTeam();
  currentWords.value = [...props.words].sort(() => 0.5 - Math.random());
};

const nextTeam = () => {
  state.value = 'next-team';
  isNextTeamButtonDisabled.value = true;
  const timeoutId = setTimeout(() => {
    isNextTeamButtonDisabled.value = false;
  }, 1000 * DISABLED_BUTTON_DURATION_SEC);
};

const showScores = () => {
  isScoresButtonDisabled.value = true;
  state.value = 'scores';
  const timeoutId = setTimeout(
    () => (isScoresButtonDisabled.value = false),
    1000 * DISABLED_BUTTON_DURATION_SEC
  );
};

const skipWord = () => {
  currentWordIndex.value = (currentWordIndex.value + 1) % currentWords.value.length;
  console.log(currentWords.value);
};

const validateWord = () => {
  scores[currentTeam.value]++;
  currentWords.value.splice(currentWordIndex.value, 1);
  currentWordIndex.value = Math.min(
    currentWordIndex.value,
    Math.max(currentWords.value.length - 1, 0)
  );
  console.log(currentWords.value);

  // When we are at the end of the round
  if (currentWords.value.length === 0) {
    currentWords.value = [...props.words];
    round.value++;
    showScores();

    // Clear timeouts to reset timer for next round
    timeoutIds.value.forEach(clearTimeout);
    timeoutIds.value = [];
    remainingTime.value = TIME;
  }
  if (round.value === 4) {
    showScores();
  }
};

const startTimer = () => {
  const timerStartRound = round.value;
  const nbSeconds = TIME;

  const timeoutId1 = setTimeout(() => {
    // Only trigger team change if no team has won this round
    if (timerStartRound === round.value) {
      currentTeam.value = (currentTeam.value + 1) % props.nbTeams;
      currentWordIndex.value =
        (currentWordIndex.value + 1) % currentWords.value.length;
      nextTeam();
    }
    remainingTime.value = 30;
  }, nbSeconds * 1000);
  timeoutIds.value.push(timeoutId1);

  // Update the remaining time info every second
  for (let i = 0; i < nbSeconds; i++) {
    const timeoutId2 = setTimeout(() => {
      remainingTime.value--;
    }, 1000 * (i + 1));
    timeoutIds.value.push(timeoutId2);
  }
};

const startNextTeamTurn = () => {
  startTimer();
  state.value = 'inside-round';
};

const backToMenu = () => {
  emit('backToMenu', null);
};

onBeforeUnmount(() => {
  timeoutIds.value.forEach(clearTimeout);
});
</script>

<template>
  <div class="content">
    <div v-if="state === 'inter-round'" class="game-view">
      <div id="round-title">Manche {{ round }}</div>
      <div v-if="round === 1" class="info">
        Vous devez faire deviner le mot en utilisant tous les mots que vous
        souhaitez du moment qu'ils ne "sonnent" pas de la même façon (ex: ne pas
        dire "maisonette" pour faire deviner "maison"). Votre équipe a autant
        d'essais qu'elle le souhaite pour deviner le mot mais vous ne pouvez pas
        passer de mot. Les mimes ne sont pas autorisés durant cette manche.
      </div>
      <div v-if="round === 2" class="info">
        Vous devez faire deviner le mot en utilisant un unique mot. Si la
        proposition de votre équipe est fausse, vous devez passer la carte.
      </div>
      <div v-if="round === 3" class="info">
        Vous devez faire deviner le mot en utilisant des mimes uniquement. Une
        seule proposition par carte.
      </div>
      <button class="base-button" @click="startRound">Compris !</button>
    </div>

    <div v-if="state === 'next-team'" class="game-view">
      <div class="info">Tour de l'équipe {{ currentTeam + 1 }}.</div>
      <button :disabled="isNextTeamButtonDisabled" :class="[
        'base-button',
        { 'disabled-button': isNextTeamButtonDisabled },
      ]" @click="startNextTeamTurn">
        Jouer
      </button>
    </div>

    <div v-if="state === 'inside-round'" class="game-view">
      <div id="current-word">
        {{ currentWords[currentWordIndex] }}
      </div>
      <div>{{ remainingTime }} secondes</div>
      <div id="action-buttons">
        <button class="base-button" @click="skipWord">Passer</button>
        <button class="base-button" @click="validateWord">Valider</button>
      </div>
    </div>

    <div v-if="state === 'scores'" class="game-view">
      <table id="scores-table">
        <thead>
          <tr>
            <th>Equipe</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in scores.slice(0, nbTeams)" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ score }}</td>
          </tr>
        </tbody>
      </table>

      <button v-if="round <= 3" class="base-button" @click="nextTeam" :disabled="isScoresButtonDisabled"
        :class="['base-button', { 'disabled-button': isScoresButtonDisabled }]">
        Continuer
      </button>
      <button v-if="round > 3" class="base-button" @click="backToMenu" :disabled="isScoresButtonDisabled"
        :class="['base-button', { 'disabled-button': isScoresButtonDisabled }]">
        Retour au menu
      </button>
    </div>
  </div>
</template>

<style scoped>
#round-title {
  font-size: 3rem;
}

.info {
  border: 2px solid white;
  margin: auto;
  background-color: var(--color-5);
  border-radius: 1rem;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
}

#scores-table {
  margin: auto;
  padding: 1rem;
  font-size: large;
}

table {
  width: 80%;
  border-collapse: collapse;
  color: white;
}

th,
td {
  border: 3px solid #fff;
  /* Black border for table cells */
  padding: 2vh;
  text-align: left;
  font-size: large;
}

th {
  background-color: var(--color-4);
  /* Light gray background for header */
}

tr {
  background-color: var(--color-5);
  /* Light gray background for even rows */
}

#current-word {
  margin: 3vw 3vw;
  min-width: 50vw;
  font-size: 3rem;
  flex-grow: 1;
  padding: auto;
  text-align: center;
}

.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-3);
  min-height: 80vh;
  margin: auto 3vw;
}

#action-buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5vw;
}

button {
  padding: 5vh 15vw;
}

.disabled-button {
  background-color: #717171;
}

#inter-round {
  display: flex;
  flex-direction: column;
}
</style>