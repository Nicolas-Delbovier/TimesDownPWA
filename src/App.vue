<script setup>
import { ref } from 'vue';
import Menu from './views/Menu.vue';
import Game from './views/Game.vue';

const state = ref('menu');
const nbTeams = ref(2);
const words = ref([]);

const onStartGame = (message) => {
  nbTeams.value = message.nbTeams;
  words.value = message.words;
  state.value = 'game';
};

const backToMenu = () => {
  state.value = 'menu';
};
</script>

<template>

  <h1 v-if="state === 'menu'" class="text-3xl text-transparent text-center font-bold mt-5 mb-5
  w-fit h-fit mx-auto
  bg-clip-text bg-gradient-to-r from-primary-color to-accent-color">
    Time's Down
  </h1>
  <Menu v-if="state === 'menu'" @startGame="onStartGame"></Menu>
  <Game v-if="state === 'game'" :nbTeams="nbTeams" :words="words" @backToMenu="backToMenu"></Game>

</template>

<style scoped></style>