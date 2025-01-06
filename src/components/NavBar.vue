<template>

    <div class="navbar-container" id="navbar">
        <NavBarItem @click="onClick('play')" imgSrc="/assets/gameController.svg" :width="width" :height="height" text="Jouer" />
        <NavBarItem @click="onClick('themes')" imgSrc="/assets/newPage.svg" :width="width" :height="height" text="Thèmes" />
        <NavBarItem @click="onClick('modifications')" imgSrc="/assets/add.svg" :width="width" :height="height" text="Modifier" />
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
    border-radius: 50px;
    border: 2px solid #fff;
    padding: 20px;
    margin: 20px 2vw;
    display: flex;
    justify-content: space-between;
}

#navbar{
    background-color: var(--color-4);
}
</style>