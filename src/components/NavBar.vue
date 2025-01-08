<template>

    <div class="navbar-container" id="navbar">
        <NavBarItem :class="current === 'play' ? 'selected' : null" @click="onClick('play')"
            imgSrc="/assets/gameController.svg" :width="width" :height="height" text="Jouer" />
        <NavBarItem :class="current === 'themes' ? 'selected' : null" @click="onClick('themes')"
            imgSrc="/assets/newPage.svg" :width="width" :height="height" text="Thèmes" />
        <NavBarItem :class="current === 'modifications' ? 'selected' : null" @click="onClick('modifications')"
            imgSrc="/assets/add.svg" :width="width" :height="height" text="Modifier" />
    </div>

</template>

<script>
import NavBarItem from './NavBarItem.vue'

export default {
    data() {
        return {
            current: "play"
        }
    },
    components: {
        NavBarItem
    },
    props: ['width', 'height'],
    methods: {
        onClick(menuView) {
            this.$emit('menuViewChange', menuView);
            this.current = menuView;
        }
    }
}
</script>

<style scoped>
.navbar-container {
    border-radius: 50px;
    border: 2px solid #fff;
    padding: 20px;
    margin: 20px 2vw;
    display: flex;
    justify-content: space-between;
}

.selected {

    /* --- Try to make the selected nav-item pop out --- */
    /* background-color: var(--color-4);
    border-radius: 40%;
    border-top: 1px solid white;
    transform: translateY(-5vh);
    transition: all 0.3s ease; */

    border: 3px solid white;
    border-radius: 30%;
}

#navbar {
    background-color: var(--color-4);
}
</style>