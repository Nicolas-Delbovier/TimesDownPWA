<template>
    <button>
        <img alt="Vue logo" class="logo" :src="imgSrc" :width="width" :height="height" />
        <span>{{ text }}</span>
    </button>
</template>

<script>
export default {
    props: ['imgSrc', 'width', 'height', 'text']

}
</script>

<style scoped>
button{
    background: none;
    border: none;
    cursor:pointer
}
</style>