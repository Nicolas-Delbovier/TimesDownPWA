<template>
    <div id="menu">
        <Play @playButtonPressed="startGame" :nbCards="nbCardsToPlay" :nbTeams="nbTeams" @updateNbCards="updateNbCards"
            @updateNbTeams="updateNbTeams" v-if="contentView === 'play'" class="content" />
        <ThemesSelection @useTheme="updateSelectedThemes" v-if="contentView === 'themes'" :decks="decks"
            :selectedThemes="selectedThemes" class="content" />
        <Modifications v-if="contentView === 'modifications'" class="content" />
        <NavBar @menuViewChange="changeMenuView" class="nav" height="50" width="50" />
    </div>
</template>


<script>
import NavBar from '../components/NavBar.vue'
import ThemesSelection from './ThemesSelection.vue';
import Modifications from './Modifications.vue';
import Play from './Play.vue';

import jsonData from '../../data/data.json';

export default {
    data() {
        return {
            contentView: 'play',
            decks: jsonData['decks'],
            selectedThemes: jsonData['decks'].map(x => x['theme']).reduce((acc, theme) => {
                acc[theme] = true;
                return acc
            }, {}),
            nbCardsToPlay: 30,
            nbTeams: 2
        };
    },
    components: {
        NavBar,
        ThemesSelection,
        Play,
        Modifications
    },
    methods: {
        updateNbCards(message) {
            this.nbCardsToPlay = message;
        },
        updateNbTeams(message) {
            this.nbTeams = message;
        },
        startGame(message) {
            let allWords = [];
            for (let deck of this.decks) {
                if (this.selectedThemes[deck['theme']]) {
                    allWords = allWords.concat(deck['words']);
                }
            }
            allWords = allWords.slice(0, this.nbCardsToPlay);
            allWords = allWords.sort(() => 0.5 - Math.random())
            this.$emit('startGame', { 'words': allWords, 'nbTeams': this.nbTeams })
        },
        changeMenuView(message) {
            this.contentView = message;
        },
        updateSelectedThemes(message) {
            this.selectedThemes[message['theme']] = message['use'];
        }

    },

}
</script>

<style scoped>
#menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-3);
    min-width: 75vw;
}

.nav {
    width: 75vw;
    position: sticky;
    bottom: 3vh;
}
</style>