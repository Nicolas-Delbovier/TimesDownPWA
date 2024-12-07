<template>
    <div id="menu">
        <h1>Time's Down</h1>
        <Modifications class="content"/>
        <NavBar class="nav" height="50" width="50" />
    </div>
</template>


<script>
import NavBar from '../components/NavBar.vue'
import ThemesSelection from './ThemesSelection.vue';
import Modifications from './Modifications.vue';
import Play from './Play.vue';

export default {
    components: {
        NavBar,
        ThemesSelection,
        Play,
        Modifications
    }

}
</script>

<style scoped>
#menu{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.content{
    height: 70vh;
    width: 90vw;
}
.nav{
    width: 90%
}
h1 {
    text-align: center;
}
</style>