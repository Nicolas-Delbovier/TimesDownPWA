<template>
    <div id="menu">
        <h1>Time's Down</h1>
        <Play @playButtonPressed="startGame" @updateNbCards="updateNbCards" v-if="contentView === 'play'" class="content" />
        <ThemesSelection @useTheme="updateSelectedThemes" v-if="contentView === 'themes'" :decks="cardsData"
            class="content" />
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
            cardsData: jsonData['cards'],
            selectedThemes: jsonData['cards'].map(x => x['theme']).reduce((acc, theme) => {
                acc[theme] = true;
                return acc
            }, {}),
            nbCardsToPlay: 30
        };
    },
    components: {
        NavBar,
        ThemesSelection,
        Play,
        Modifications
    },
    methods: {
        updateNbCards(message){
            this.nbCardsToPlay = message;
        },
        startGame(message) {
            let allWords = [];
            for (let  deck of this.cardsData){
                if (this.selectedThemes[deck['theme']]) {
                    allWords = allWords.concat(deck['words']);
                }
            }
            allWords = allWords.slice(0, this.nbCardsToPlay);
            allWords = allWords.sort(() => 0.5 - Math.random())
            console.log(allWords)
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
}

.content {
    height: 60vh;
    width: 90vw;
    overflow-y: auto;
}

.nav {
    width: 90%
}

h1 {
    text-align: center;
}
</style>