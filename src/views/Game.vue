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
      <button
        :disabled="isNextTeamButtonDisabled"
        :class="[
          'base-button',
          { 'disabled-button': isNextTeamButtonDisabled },
        ]"
        @click="
          () => {
            startTimer();
            this.state = 'inside-round';
          }
        "
      >
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

      <button
        v-if="round <= 3"
        class="base-button"
        @click="nextTeam"
        :disabled="isScoresButtonDisabled"
        :class="['base-button', { 'disabled-button': isScoresButtonDisabled }]"
      >
        Continuer
      </button>
      <button
        v-if="round > 3"
        class="base-button"
        @click="backToMenu"
        :disabled="isScoresButtonDisabled"
        :class="['base-button', { 'disabled-button': isScoresButtonDisabled }]"
      >
        Retour au menu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["backToMenu"],
  props: ["nbTeams", "words"],
  data() {
    return {
      round: 1,
      state: "inter-round",
      currentWords: [...this.words], // words that are still in the deck for this round
      currentWordIndex: 0,
      currentTeam: 0, // index of the team currently playing
      scores: [0, 0, 0, 0], // score of each Team
      remainingTime: 30,
      TIME: 30,
      DISABLED_BUTTON_DURATION_SEC: 2,
      timeoutIds: [],
      isNextTeamButtonDisabled: true,
      isScoresButtonDisabled: true,
    };
  },
  methods: {
    startRound() {
      this.nextTeam();
      this.currentWords = [...this.words].sort(() => 0.5 - Math.random());
    },
    nextTeam() {
      this.state = "next-team";
      this.isNextTeamButtonDisabled = true;
      setTimeout(() => {
        this.isNextTeamButtonDisabled = false;
      }, 1000 * this.DISABLED_BUTTON_DURATION_SEC);
    },
    showScores() {
      this.isScoresButtonDisabled = true;
      this.state = "scores";
      setTimeout(
        () => (this.isScoresButtonDisabled = false),
        1000 * this.DISABLED_BUTTON_DURATION_SEC
      );
    },
    skipWord() {
      this.currentWordIndex =
        (this.currentWordIndex + 1) % this.currentWords.length;
      console.log(this.currentWords);
    },
    validateWord() {
      this.scores[this.currentTeam] += 1;
      this.currentWords.splice(this.currentWordIndex, 1);
      this.currentWordIndex = Math.min(
        this.currentWordIndex,
        Math.max(this.currentWords.length - 1, 0)
      );
      console.log(this.currentWords);

      // When we are at the end of the round
      if (this.currentWords.length === 0) {
        this.currentWords = [...this.words];
        this.round += 1;
        this.showScores();

        // Clear timeouts to reset timer for next round
        for (let id of this.timeoutIds) {
          clearTimeout(id);
        }
        this.timeoutIds = [];
        this.remainingTime = this.TIME;
      }
      if (this.round === 4) {
        this.showScores();
      }
    },
    startTimer() {
      let timerStartRound = this.round;
      let nbSeconds = this.TIME;

      let id = setTimeout(() => {
        // Only trigger team change if no team has won this round
        if (timerStartRound === this.round) {
          this.currentTeam = (this.currentTeam + 1) % this.nbTeams;
          this.currentWordIndex =
            (this.currentWordIndex + 1) % this.currentWords.length;
          this.nextTeam();
        }
        this.remainingTime = 30;
      }, nbSeconds * 1000);
      this.timeoutIds.push(id);

      // Update the remaining time info every seconds
      for (let i = 0; i < nbSeconds; i++) {
        let id = setTimeout(() => {
          this.remainingTime -= 1;
        }, 1000 * (i + 1));
        this.timeoutIds.push(id);
      }
    },
    backToMenu() {
      this.$emit("backToMenu", null);
    },
  },
};
</script>

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
