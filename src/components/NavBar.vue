<script setup>
import { ref } from 'vue';
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
    <div id="nav-bar" class="bg-background-color flex flex-row justify-between items-center py-4">
        <NavBarItem class="h-full" :iconBackgroundClass="current === 'play' ? 'bg-primary-color' : ''"
            @click="onClick('play')" imgSrc="/assets/playMenuIcon.svg" :width="width" :height="height" text="Jouer" />
        <NavBarItem class="h-full" :iconBackgroundClass="current === 'themes' ? 'bg-primary-color' : ''"
            @click="onClick('themes')" imgSrc="/assets/themesMenuIcon.svg" :width="width" :height="height"
            text="Thèmes" />
        <NavBarItem class="h-full" :iconBackgroundClass="current === 'modifications' ? 'bg-primary-color' : ''"
            @click="onClick('modifications')" imgSrc="/assets/modificationsMenuIcon.svg" :width="width" :height="height"
            text="Modifier" />
    </div>
</template>

<style scoped></style>