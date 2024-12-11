<template>
    <div class="content" id="play-content">
        <span id="current-word">
            {{ currentWord }}
        </span>
        <div id="action-buttons"><button>Passer</button><button>Valider</button></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            allWords: [],
            currentWords: [],
            currentWord: 'test',
        }
    }

}
</script>

<style scoped>
#current-word{
    padding: 20% 45%;
    font-size: 3rem;
}
#play-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: aqua;
    padding-bottom: 2vh;
}

#action-buttons{
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 5vw;
}

button{
    cursor: pointer;
    padding: 5vh 15vw;
}
</style>