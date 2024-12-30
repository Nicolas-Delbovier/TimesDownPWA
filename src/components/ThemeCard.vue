<template>
    <div id="ThemeCard" :class="use ? 'selected' : 'not-selected'" class="base-button" @click="shiftUse">
        <h2>{{ theme }}</h2>
        <span>Nombres de mots : {{ numberWords }}</span>
        <!-- <span>utiliser: {{ use }}</span> -->
    </div>
  
</template>

<script>
export default {
    props: ['theme', 'numberWords', 'isUsed'],
    data(){
        return{
            use: this.isUsed
        }
    },
    methods: {
        shiftUse(){
            this.use = !this.use;
            this.$emit('useTheme', {'theme': this.theme, 'use': this.use})
        }
    },

}
</script>

<style scoped>
#ThemeCard{
    display: flex;
    flex-direction: column;
    border-radius: 50px;
    padding: 20px;
    margin: 20px 10vw;
    justify-content: space-between;
}

.selected{
    background-color: var(--color-5);
}
.not-selected{
    background-color: var(--color-2);
}
</style>