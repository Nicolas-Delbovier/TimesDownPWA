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
  <div id="window">
    <h1>Time's Down</h1>
    <Menu v-if="state === 'menu'" @startGame="onStartGame"></Menu>
    <Game v-if="state === 'game'" :nbTeams="nbTeams" :words="words" @backToMenu="backToMenu"></Game>
  </div>
</template>

<style scoped>
#window {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-3);
}

h1 {
  text-align: center;
  background-color: var(--color-4);
  /* color: var(--color-3); */
  color: #fff;
  width: 100%;
  margin-top: 0;
  padding: 0.5em 0;
}
</style>