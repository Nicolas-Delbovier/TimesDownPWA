<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Menu from './views/Menu.vue'
import Game from './views/Game.vue'

</script>

<template>
  <div id="window">
    <h1>Time's Down</h1>
    <!-- <Menu @startGame="startGame"></Menu> -->
    <Game></Game>
  </div>
</template>

<style scoped>

#window{
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
    text-align: center;
}


</style>
