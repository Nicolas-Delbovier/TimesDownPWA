<template>
    <div id="main">
        <input type="text">
        <input type="text">
        <button>Ajouter</button>
        <span>...</span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#main{
    display: flex;
    flex-direction: column;
    padding: 2vw;
    gap: 5px;
    text-align: center;
    background: rgb(188, 230, 188);
    background-color: var(--color-3);
}
</style>