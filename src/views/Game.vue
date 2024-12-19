<template>
    <div v-if="state === 'inter-round'">
        <span v-if="round === 1">Manche {{ round }}. Vous devez faire deviner le mot en utilisant tous les mots que vous
            souhaitez du moment qu'ils ne "sonnent" pas de la même façon (ex: ne pas dire "maisonette" plour faire
            deviner "maison"). Votre équipe a autant d'essais qu'elle le souhaite pour deviner le mot. Les mimes ne sont
            pas autorisés durant cette manche.</span>
        <span v-if="round === 2">Manche {{ round }}. Vous devez faire deviner le mot en utilisant un unique mot. Si la
            proposition de votre équipe est fausse, vous dever passer la carte.</span>
        <span v-if="round === 3">Manche {{ round }}. Vous devez faire deviner le mot en utilisant des mimes uniquement.
            Une seule proposition par carte.</span>
        <span>Tour de l'équipe {{ currentTeam }}</span>
        <button @click="() => this.state = 'inside-round'">Jouer</button>
    </div>
    <div v-if="state === 'inside-round'" id="play-content">
        <span id="current-word">
            {{ currentWords[currentWordIndex] }}
        </span>
        <div id="action-buttons"><button @click="skipWord">Passer</button><button @click="validateWord">Valider</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['nbTeams', 'words'],
    data() {
        return {
            round: 1,
            state: 'inter-round',
            currentWords: [...this.words], // words that are still in the deck for this round
            currentWordIndex: 0,
            currentTeam: 0, // index of the team currently playing
            scores: [0, 0, 0, 0] // score of each Team
        }
    },
    methods: {
        skipWord() {
            this.currentWordIndex = (this.currentWordIndex + 1) % this.currentWords.length
            console.log(this.currentWords)
        },
        validateWord() {
            this.currentWords.shift(1)
            console.log(this.currentWords)
            if (this.currentWords.length === 0) {
                this.currentWords = [...this.words];
                this.state = 'inter-round';
                this.round += 1;
            }
        }
    }
}
</script>

<style scoped>
#current-word {
    padding: 20% 45%;
    font-size: 3rem;
    flex-grow: 1;
}

#play-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: aqua;
    padding-bottom: 2vh;
    height: 80%;
    width: 95%;
}

#action-buttons {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 5vw;
}

button {
    cursor: pointer;
    padding: 5vh 15vw;
}
</style>