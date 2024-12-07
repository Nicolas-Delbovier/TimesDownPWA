<template>

    <div class="navbar-container">
        <NavBarItem imgSrc="../src/assets/gameController.svg" :width="width" :height="height" text="Jouer" />
        <NavBarItem imgSrc="../src/assets/newPage.svg" :width="width" :height="height" text="Thèmes" />
        <NavBarItem imgSrc="../src/assets/add.svg" :width="width" :height="height" text="Modifier" />
    </div>

</template>

<script>
import NavBarItem from './NavBarItem.vue'

export default {
    components: {
        NavBarItem
    },
    props: ['width', 'height']
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
</style>