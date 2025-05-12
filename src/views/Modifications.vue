<script setup>
// No script logic needed for this component in Composition API either
</script>

<template>
    <div id="main" class="content">
        <div id="unavailable-message">Indisponible</div>
    </div>
</template>

<style scoped>
#main {
    display: flex;
    flex-direction: column;
    padding: 2vw;
    gap: 5px;
    justify-content: center;
    background-color: var(--color-3);
    min-height: 60vh;
    padding: auto;
}

#unavailable-message {
    border: 5px double var(--color-1);
    border-radius: 10px;
    text-align: center;
    font-size: 2rem;
    color: var(--color-1);
}
</style>