<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

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
watch(() => props.nbTeams, (newNbTeams) => {
    localNbTeams.value = newNbTeams;
});

watch(() => props.nbCards, (newNbCards) => {
    localNbCards.value = newNbCards;
});
</script>

<template>
    <div id="main">
        <div id="nbCardsRadioButtons">
            <h3>Nombre de cartes</h3>
            <button @click="updateNbCards(15)"
                :class="{ 'active-class': localNbCards === 15, 'inactive-class': localNbCards !== 15 }"
                class="button base-button">
                15
            </button>
            <button @click="updateNbCards(30)"
                :class="{ 'active-class': localNbCards === 30, 'inactive-class': localNbCards !== 30 }"
                class="button base-button">
                30
            </button>
            <button @click="updateNbCards(45)"
                :class="{ 'active-class': localNbCards === 45, 'inactive-class': localNbCards !== 45 }"
                class="button base-button">
                45
            </button>
        </div>
        <div id="nbCardsTeamsButtons">
            <h3>Nombre d'équipes</h3>
            <button @click="updateNbTeams(2)"
                :class="{ 'active-class': localNbTeams === 2, 'inactive-class': localNbTeams !== 2 }"
                class="button base-button">
                2
            </button>
            <button @click="updateNbTeams(3)"
                :class="{ 'active-class': localNbTeams === 3, 'inactive-class': localNbTeams !== 3 }"
                class="button base-button">
                3
            </button>
            <button @click="updateNbTeams(4)"
                :class="{ 'active-class': localNbTeams === 4, 'inactive-class': localNbTeams !== 4 }"
                class="button base-button">
                4
            </button>
        </div>

        <button class="button base-button" id="playButton" @click="emitPressPlayMessage">
            Jouer
        </button>
    </div>
</template>

<style scoped>
#main {
    text-align: center;
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
    font-size: large;
    padding: 3vh;
    border: 5px solid white;
}

#nbCardsRadioButtons,
#nbCardsTeamsButtons {
    display: flex;
    flex-direction: column;
}
</style>