<template>
    <button>
        <img alt="NavBar icon" class="icon" :src="imgSrc" :width="width" :height="height" />
        <span>{{ text }}</span>
    </button>
</template>

<script>
export default {
    props: ['imgSrc', 'width', 'height', 'text']

}
</script>

<style scoped>
button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    justify-content: center;
}

.icon{
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(70deg) brightness(104%) contrast(104%);
}

span{
    color: white;
}
</style>