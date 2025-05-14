<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import NavBarItem from './NavBarItem.vue';

const props = defineProps({
    width: {
        type: [String, Number],
        default: 30,
    },
    height: {
        type: [String, Number],
        default: 30,
    },
});

const emit = defineEmits(['menuViewChange']);

const current = ref('play');

const onClick = (menuView) => {
    emit('menuViewChange', menuView);
    current.value = menuView;
};
</script>

<template>
    <div class="bg-background-color flex flex-row justify-between items-center py-4">
        <NavBarItem :class="{ 'bg-primary-color': current === 'play' }" @click="onClick('play')"
            imgSrc="/assets/gameController.svg" :width="width" :height="height" text="Jouer" />
        <NavBarItem :class="{ 'bg-primary-color': current === 'themes' }" @click="onClick('themes')"
            imgSrc="/assets/newPage.svg" :width="width" :height="height" text="Thèmes" />
        <NavBarItem :class="{ 'bg-primary-color': current === 'modifications' }" @click="onClick('modifications')"
            imgSrc="/assets/add.svg" :width="width" :height="height" text="Modifier" />
    </div>
</template>

<style scoped></style>