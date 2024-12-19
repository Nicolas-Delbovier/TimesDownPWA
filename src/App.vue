<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Menu from './views/Menu.vue'
import Game from './views/Game.vue'


</script>

<template>
  <div id="window">
    <h1>Time's Down</h1>
    <Menu v-if="state === 'menu'" @startGame="onStartGame"></Menu>
    <Game v-if="state === 'game'"></Game>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'menu'
    }
  },
  methods: {
    onStartGame(message) {
      console.log('game start', message)
      this.state = 'game';
    }
  }
}
</script>

<style scoped>
#window {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 95vh;
  width: 95vw
}

h1 {
  text-align: center;
}
</style>
