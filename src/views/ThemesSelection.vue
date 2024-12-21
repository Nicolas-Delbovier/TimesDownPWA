<template>
    <div id="main">
        <h2>Sélection de thème</h2>
        <div v-for="deck in decks" :key="deck['theme']">
            <ThemeCard @useTheme="message => this.$emit('useTheme', message)" :theme="deck['theme']" :numberWords="deck['words'].length"></ThemeCard>
        </div>
    </div>
</template>

<script>
import ThemeCard from '@/components/ThemeCard.vue';
export default {
    props: ['decks'],
    components:{
        ThemeCard
    }

}
</script>

<style scoped>
#main {
    text-align: center;
    background: rgb(188, 230, 188);
    background-color: var(--color-3);
}
</style>