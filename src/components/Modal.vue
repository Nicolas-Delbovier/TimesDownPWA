<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'alert',
    validator: (value) => ['confirm', 'alert'].includes(value),
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:isVisible', 'confirmed', 'cancelled']);

const confirmAction = () => {
  emit('update:isVisible', false);
  emit('confirmed');
};

const cancelAction = () => {
  emit('update:isVisible', false);
  emit('cancelled');
};

const closeAlert = () => {
  emit('update:isVisible', false);
  if (!props.type === 'confirm') {
    emit('confirmed'); // For alerts, closing is equivalent to confirming
  }
};
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black/90 flex items-center justify-center p-4">
    <div class="bg-tertiary-color rounded-lg p-6 w-full">
      <p class="text-text-color text-center font-bold mb-6">{{ message }}</p>

      <div v-if="type === 'confirm'" class="flex justify-around gap-4">
        <button @click="cancelAction" class="flex-1 btn btn-interactive btn-secondary py-3">
          Annuler
        </button>
        <button @click="confirmAction" class="flex-1 btn btn-interactive btn-primary py-3">
          Confirmer
        </button>
      </div>
      <div v-else class="flex justify-center">
        <button @click="closeAlert" class="flex-1 btn btn-interactive btn-primary py-3">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
