<template>
  <div class="game-view" v-if="state === 'inter-round'">
    <div id="round-title">Manche {{ round }}</div>
    <div v-if="round === 1" class="info">
      Vous devez faire deviner le mot en utilisant tous les
      mots que vous souhaitez du moment qu'ils ne "sonnent" pas de la même façon
      (ex: ne pas dire "maisonette" pour faire deviner "maison"). Votre équipe a
      autant d'essais qu'elle le souhaite pour deviner le mot. Les mimes ne sont
      pas autorisés durant cette manche.
    </div>
    <div v-if="round === 2" class="info">
      Vous devez faire deviner le mot en utilisant un unique
      mot. Si la proposition de votre équipe est fausse, vous dever passer la
      carte.
    </div>
    <div v-if="round === 3" class="info">
      Vous devez faire deviner le mot en utilisant des mimes
      uniquement. Une seule proposition par carte.
    </div>
    <button class="base-button" @click="() => (this.state = 'next-team')">
      Compris !
    </button>
  </div>

  <div class="game-view" v-if="state === 'next-team'">
    <div class="info">Tour de l'équipe {{ currentTeam }}.</div>
    <button
      class="base-button"
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

  <div class="game-view" v-if="state === 'inside-round'">
    <div id="current-word">
      {{ currentWords[currentWordIndex] }}
    </div>
    <div>{{ remainingTime }} secondes</div>
    <div id="action-buttons">
      <button class="base-button" @click="skipWord">Passer</button>
      <button class="base-button" @click="validateWord">Valider</button>
    </div>
  </div>

  <div class="game-view" v-if="state === 'scores'">
    <div class="info">Scores: {{ scores.slice(0, nbTeams) }}</div>
    <button class="base-button" @click="backToMenu">Retour au menu</button>
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
      timeoutIds: [],
    };
  },
  methods: {
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
      if (this.currentWords.length === 0) {
        this.currentWords = [...this.words];
        this.state = "inter-round";
        this.round += 1;
        this.remainingTime = this.TIME;

        // Clear timeouts to reset timer for next round
        for (let id of this.timeoutIds) {
          clearTimeout(id);
        }
        this.timeoutIds = [];
      }
      if (this.round === 4) {
        this.state = "scores";
      }
    },
    startTimer() {
      let timerStartRound = this.round;
      let nbSeconds = this.TIME;

      let id = setTimeout(() => {
        // Only trigger team change if no team has won this round
        if (timerStartRound === this.round) {
          this.currentTeam = (this.currentTeam + 1) % this.nbTeams;
          this.state = "next-team";
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

#round-title{
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

#current-word {
  padding: 20% 45%;
  font-size: 3rem;
  flex-grow: 1;
}

.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-3);
  padding-bottom: 2vh;
  height: 80%;
  width: 95%;
}

#action-buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  /* gap: 5vw; */
}

button {
  padding: 5vh 15vw;
}

#inter-round {
  display: flex;
  flex-direction: column;
}
</style>
