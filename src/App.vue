<script setup>
import { ref, provide } from 'vue';
import Menu from './views/Menu.vue';
import Game from './views/Game.vue';
import ThemeEdit from './views/ThemeEdit.vue';

const state = ref('menu');
const nbTeams = ref(2);
const words = ref([]);
const themeToEdit = ref('');

const onStartGame = (message) => {
  nbTeams.value = message.nbTeams;
  words.value = message.words;
  state.value = 'game';
};

const backToMenu = () => {
  state.value = 'menu';
};

const onEditTheme = (event) => {
  state.value = 'editTheme';
  themeToEdit.value = event;
};
provide('triggerEditTheme', onEditTheme);
</script>

<template>
  <h1
    v-if="state === 'menu'"
    class="text-3xl text-transparent text-center font-bold pt-5 w-fit h-fit mx-auto bg-clip-text bg-gradient-to-r from-primary-color to-accent-color"
  >
    Time's Down
  </h1>
  <Menu v-if="state === 'menu'" @startGame="onStartGame"></Menu>
  <Game v-if="state === 'game'" :nbTeams="nbTeams" :words="words" @backToMenu="backToMenu"></Game>
  <ThemeEdit v-if="state === 'editTheme'" @backToMenu="backToMenu" :title="themeToEdit"></ThemeEdit>
</template>

<style scoped></style>
