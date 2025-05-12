<script setup>
import { defineProps } from 'vue';

defineProps({
    imgSrc: {
        type: String,
        required: true,
    },
    width: {
        type: [String, Number],
        default: 24,
    },
    height: {
        type: [String, Number],
        default: 24,
    },
    text: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <button>
        <img alt="NavBar icon" class="icon" :src="imgSrc" :width="width" :height="height" />
        <span>{{ text }}</span>
    </button>
</template>

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

.icon {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(70deg) brightness(104%) contrast(104%);
}

span {
    color: white;
}
</style>