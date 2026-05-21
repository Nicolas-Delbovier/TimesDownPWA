<script setup>
import { inject } from 'vue';

defineProps({
  round: {
    type: Number,
    required: true,
  },
  roundTypeLabel: {
    type: [String],
    required: true,
  },
});

const emit = defineEmits(['homeBtnClick']);
const showModal = inject('showModal');

const onHomeClick = () => {
  showModal({
    message: 'Retourner au menu ?',
    type: 'confirm',
    onConfirmed: handleHomeConfirmed,
  });
};

const handleHomeConfirmed = () => {
  emit('homeBtnClick', null);
};
</script>

<template>
  <div class="">
    <button
      id="backHomeBtn"
      class="cursor-pointer font-bold p-2 rounded-xl border-2"
      @click="onHomeClick"
    >
      <img alt="NavBar icon" src="/assets/home.svg" width="20" height="20" />
    </button>
    <div id="round-title" class="flex flex-col items-center justify-center mt-8">
      <span class="font-medium text-3xl"> Manche {{ round }} </span>
      <span class="mt-1"> ({{ roundTypeLabel }}) </span>
    </div>
  </div>
</template>

<style scoped>
#backHomeBtn {
  position: absolute;
  left: 1rem;
  top: 1rem;
}
</style>
