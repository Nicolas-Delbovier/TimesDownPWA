<template>
    <div id="main">
        <h2>Jouer</h2>
        <div id="nbCardsRadioButtons">
            <h3>Nombre de cartes</h3>
            <button @click="updateNbCards(15)" :class="localNbCards === 15 ? 'active-class' : 'inactive-class'"
                class="button base-button">15</button>
            <button @click="updateNbCards(30)" :class="localNbCards === 30 ? 'active-class' : 'inactive-class'"
                class="button base-button">30</button>
            <button @click="updateNbCards(45)" :class="localNbCards === 45 ? 'active-class' : 'inactive-class'"
                class="button base-button">45</button>
        </div>
        <div id="nbCardsTeamsButtons">
            <h3>Nombre d'équipes</h3>
            <button @click="updateNbTeams(2)" :class="localNbTeams === 2 ? 'active-class' : 'inactive-class'"
                class="button base-button">2</button>
            <button @click="updateNbTeams(3)" :class="localNbTeams === 3 ? 'active-class' : 'inactive-class'"
                class="button base-button">3</button>
            <button @click="updateNbTeams(4)" :class="localNbTeams === 4 ? 'active-class' : 'inactive-class'"
                class="button base-button">4</button>
        </div>

        <button class="button base-button" id="playButton" @click="emitPressPlayMessage">
            Jouer
        </button>
    </div>
</template>

<script>
export default {
    props: ["nbTeams", "nbCards"],
    data() {
        return {
            "localNbTeams": this.nbTeams,
            "localNbCards": this.nbCards
        }
    },
    methods: {
        emitPressPlayMessage() {
            this.$emit("playButtonPressed", "playButtonPressed");
        },
        updateNbCards(number) {
            this.localNbCards = number;
            this.$emit('updateNbCards', number);
        },
        updateNbTeams(number) {
            this.localNbTeams = number;
            this.$emit('updateNbTeams', number);
        }
    },
};
</script>

<style scoped>
#main {
    text-align: center;
    background: rgb(188, 230, 188);
    display: flex;
    background-color: var(--color-3);
    flex-direction: column;
}

.button {
    margin: 1vh 5vw;
    padding: 1rem;
}

.active-class {
    background-color: var(--color-4);
}

.inactive-class {
    background-color: var(--color-5);

}

#playButton {
    margin: 5vh 5vw;
    font-weight: bold;
}

#nbCardsRadioButtons,
#nbCardsTeamsButtons {
    display: flex;
    flex-direction: column;
}
</style>
