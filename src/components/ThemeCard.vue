<script setup>
import { ref } from "vue";

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
        class="flex flex-col items-center text-text-color cursor-pointer px-2 pt-2 pb-4 gap-2 rounded-2xl w-11/12"
        @click="shiftUse">
        <span id="card-title" class="text-center text-lg font-medium">{{ theme }}</span>
        <!-- <span>Nombres de mots : {{ numberWords }}</span> -->
        <button class="text-text-color cursor-pointer p-2 border-2 border-text-color rounded-4xl"
            :class="{ 'bg-primary-color': use, 'bg-accent-color/10': !use }">
            {{ use ? "Sélectionné" : "Non sélectionné" }}
        </button>
    </div>
</template>

<style scoped></style>
