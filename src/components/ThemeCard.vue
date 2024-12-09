<template>
    <div id="ThemeCard" @click="shiftUse">
        <h2>{{ theme }}</h2>
        <span>Number words: {{ numberWords }}</span>
        <span>Use: {{ use }}</span>
    </div>
  
</template>

<script>
export default {
    data(){
        return{
            use: true
        }
    },
    methods: {
        shiftUse(){
            this.use = !this.use;
            this.$emit('useTheme', {'theme': this.theme, 'use': this.use})
        }
    },
    props: ['theme', 'numberWords']

}
</script>

<style scoped>
#ThemeCard{
    display: flex;
    flex-direction: column;
    border-radius: 50px;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    padding: 20px;
    margin: 20px 10vw;
    justify-content: space-between;
    cursor: pointer;
}
</style>