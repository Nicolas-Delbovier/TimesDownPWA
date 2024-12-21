<template>

    <div class="navbar-container" id="navbar">
        <NavBarItem @click="onClick('play')" imgSrc="../src/assets/gameController.svg" :width="width" :height="height" text="Jouer" />
        <NavBarItem @click="onClick('themes')" imgSrc="../src/assets/newPage.svg" :width="width" :height="height" text="Thèmes" />
        <NavBarItem @click="onClick('modifications')" imgSrc="../src/assets/add.svg" :width="width" :height="height" text="Modifier" />
    </div>

</template>

<script>
import NavBarItem from './NavBarItem.vue'

export default {
    components: {
        NavBarItem
    },
    props: ['width', 'height'],
    methods:{
        onClick(menuView){
            this.$emit('menuViewChange', menuView);
        }
    }
}
</script>

<style scoped>
.navbar-container{
    position: sticky;
    bottom:0;
    border-radius: 50px;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    padding: 20px;
    margin: 20px 2vw;
    display: flex;
    justify-content: space-between;
}

#navbar{
    background-color: var(--color-4);
}
</style>