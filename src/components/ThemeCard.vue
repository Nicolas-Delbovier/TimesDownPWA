<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    theme: {
        type: String,
        required: true,
    },
    numberWords: {
        type: Number,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['useTheme']);

const use = ref(props.isUsed);

const shiftUse = () => {
    use.value = !use.value;
    emit('useTheme', { theme: props.theme, use: use.value });
};
</script>

<template>
    <div id="ThemeCard" :class="{ 'selected': use, 'not-selected': !use }" class="base-button" @click="shiftUse">
        <h2>{{ theme }}</h2>
        <span>Nombres de mots : {{ numberWords }}</span>
    </div>
</template>

<style scoped>
#ThemeCard {
    display: flex;
    flex-direction: column;
    border-radius: 50px;
    padding: 20px;
    margin: 20px 10vw;
    justify-content: space-between;
}

.selected {
    background-color: var(--color-5);
}

.not-selected {
    background-color: var(--color-2);
}
</style>