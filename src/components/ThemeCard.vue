<script setup>
import { ref, defineProps, defineEmits } from "vue";

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

const emit = defineEmits(["useTheme"]);

const use = ref(props.isUsed);

const shiftUse = () => {
    use.value = !use.value;
    emit("useTheme", { theme: props.theme, use: use.value });
};
</script>

<template>
    <div id="theme-card"
        :class="{ 'bg-primary-color/80 hover:bg-primary-color/60 active:bg-primary-color/60': use, 'bg-accent-color/20 hover:bg-accent-color/10 active:bg-accent-color/10': !use }"
        class="flex flex-col items-center text-text-color cursor-pointer w-full h-60 rounded-2xl px-2 pt-2 pb-4 gap-2 justify-between"
        @click="shiftUse">
        <h2 class="text-lg font-medium">{{ theme }}</h2>
        <!-- <span>Nombres de mots : {{ numberWords }}</span> -->
        <button class="text-text-color cursor-pointer w-50 h-8 rounded-4xl m-auto border-2 border-text-color"
            :class="{ 'bg-primary-color': use, 'bg-accent-color/10': !use }">
            {{ use ? "Sélectionné" : "Non sélectionné" }}
        </button>
    </div>
</template>

<style scoped></style>
