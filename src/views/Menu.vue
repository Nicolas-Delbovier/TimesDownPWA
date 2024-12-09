<template>
    <div id="menu">
        <h1>Time's Down</h1>
        <Play v-if="contentView === 'play'" class="content" />
        <ThemesSelection v-if="contentView === 'themes'" :cards="cards" class="content" />
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
            cards: jsonData
        };
    },
    components: {
        NavBar,
        ThemesSelection,
        Play,
        Modifications
    },
    methods: {
        changeMenuView(message) {
            this.contentView = message;
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