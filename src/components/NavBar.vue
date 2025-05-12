<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import NavBarItem from './NavBarItem.vue';

const props = defineProps({
    width: {
        type: [String, Number],
        default: 30,
    },
    height: {
        type: [String, Number],
        default: 30,
    },
});

const emit = defineEmits(['menuViewChange']);

const current = ref('play');

const onClick = (menuView) => {
    emit('menuViewChange', menuView);
    current.value = menuView;
};
</script>

<template>
    <div class="navbar-container" id="navbar">
        <NavBarItem :class="{ 'selected': current === 'play' }" @click="onClick('play')"
            imgSrc="/assets/gameController.svg" :width="width" :height="height" text="Jouer" />
        <NavBarItem :class="{ 'selected': current === 'themes' }" @click="onClick('themes')"
            imgSrc="/assets/newPage.svg" :width="width" :height="height" text="Thèmes" />
        <NavBarItem :class="{ 'selected': current === 'modifications' }" @click="onClick('modifications')"
            imgSrc="/assets/add.svg" :width="width" :height="height" text="Modifier" />
    </div>
</template>

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