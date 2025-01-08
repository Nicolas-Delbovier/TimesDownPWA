<template>
    <div id="main">
        <div v-for="deck in decks" :key="deck['theme']">
            <ThemeCard @useTheme="message => this.$emit('useTheme', message)" :theme="deck['theme']" :numberWords="deck['words'].length" :isUsed="selectedThemes[deck['theme']]"></ThemeCard>
        </div>
    </div>
</template>

<script>
import ThemeCard from '@/components/ThemeCard.vue';
export default {
    props: ['decks', 'selectedThemes'],
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