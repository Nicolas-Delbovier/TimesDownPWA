<template>

    <div class="navbar-container">
        <NavBarItem imgSrc="../src/assets/gameController.svg" width="50" height="50" text="Jouer" />
        <NavBarItem imgSrc="../src/assets/newPage.svg" width="50" height="50" text="Thèmes" />
        <NavBarItem imgSrc="../src/assets/add.svg" width="50" height="50" text="créer" />
    </div>

</template>

<script>
import NavBarItem from './NavBarItem.vue'

export default {
    components: {
        NavBarItem
    }
}
</script>

<style scoped>
.navbar-container{
    position: sticky;
    bottom:0;
    border-radius: 5%;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    padding: 20px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
}
</style>