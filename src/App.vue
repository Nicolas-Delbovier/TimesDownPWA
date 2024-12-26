<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Menu from './views/Menu.vue'
import Game from './views/Game.vue'


</script>

<template>
  <div id="window">
    <h1>Time's Down</h1>
    <Menu v-if="state === 'menu'" @startGame="onStartGame"></Menu>
    <Game v-if="state === 'game'" :nbTeams="nbTeams" :words="words" @backToMenu="backToMenu"></Game>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'menu',
      nbTeams: 2,
      words: []

    }
  },
  methods: {
    onStartGame(message) {
      this.nbTeams = message.nbTeams;
      this.words = message.words;
      this.state = 'game';
    },
    backToMenu(message) {
      this.state = 'menu';
    }
  }
}
</script>

<style scoped>
#window {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: auto;
  background-color: var(--color-3);
}

h1 {
  text-align: center;
  background-color: var(--color-4);
  /* color: var(--color-3); */
  color: #fff;
  width: 100%;
  margin-top:0;
  padding: 0.5em 0;

}
</style>
