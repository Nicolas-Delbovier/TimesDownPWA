<template>
    <div id="main">
        <h2>Jouer</h2>
        <div id="nbCardsRadioButtons">
            <h3>Nombre de cartes</h3>
            <button @click="updateNbCards(15)" class="button">15</button>
            <button @click="updateNbCards(30)" class="button">30</button>
            <button @click="updateNbCards(45)" class="button">45</button>
        </div>
        <div id="nbCardsTeamsButtons">
            <h3>Nombre d'équipes</h3>
            <button @click="updateNbTeams(2)" class="button">2</button>
            <button @click="updateNbTeams(3)" class="button">3</button>
            <button @click="updateNbTeams(4)" class="button">4</button>
        </div>

        <button class="button" id="playButton" @click="emitPressPlayMessage">
            Jouer
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        emitPressPlayMessage() {
            this.$emit("playButtonPressed", "playButtonPressed");
        },
        updateNbCards(number){
            this.$emit('updateNbCards', number)
        },
        updateNbTeams(number){
            this.$emit('updateNbTeams', number)
        }
    },
};
</script>

<style scoped>
#main {
    text-align: center;
    background: rgb(188, 230, 188);
    display: flex;
    flex-direction: column;
}

.button {
    margin: 1vh 5vw;
    padding: 1rem;
    border-radius: 5px;
    cursor: pointer;
}

#playButton {
    margin: 5vh 5vw;
}

#nbCardsRadioButtons, #nbCardsTeamsButtons {
    display: flex;
    flex-direction: column;
}
</style>
