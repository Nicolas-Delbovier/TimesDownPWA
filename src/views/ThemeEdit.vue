<script setup>
import { ref, onMounted } from 'vue';
import { deckService } from '../services/deckService';
import Modal from '../components/Modal.vue';

const emit = defineEmits(['backToMenu']);
const props = defineProps(['title']);

const themeName = ref('');
const wordsText = ref('');
const isNew = ref(true);

const showDeleteConfirm = ref(false);
const showValidationAlert = ref(false);
const validationMessage = ref('');

onMounted(() => {
  if (props.title && props.title !== 'New') {
    const deck = deckService.getDeck(props.title);
    if (deck) {
      themeName.value = deck.title;
      wordsText.value = deck.words.join('\n');
      isNew.value = false;
    }
  }
});

const saveTheme = () => {
  if (!themeName.value.trim()) {
    validationMessage.value = 'Veuillez entrer un nom de thème.';
    showValidationAlert.value = true;
    return;
  }

  const words = wordsText.value
    .split('\n')
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  if (words.length === 0) {
    validationMessage.value = 'Veuillez ajouter au moins un mot.';
    showValidationAlert.value = true;
    return;
  }

  // If we renamed an existing theme, we should delete the old one first
  if (!isNew.value && props.title !== themeName.value) {
    deckService.deleteDeck(props.title);
  }

  deckService.saveDeck({
    title: themeName.value,
    words: words,
    use: true,
    isUserGenerated: true,
  });

  emit('backToMenu');
};

const deleteTheme = () => {
  showDeleteConfirm.value = true;
};

const handleDeleteConfirmed = () => {
  deckService.deleteDeck(props.title);
  emit('backToMenu');
};

const backToMenu = () => {
  emit('backToMenu');
};
</script>

<template>
  <div id="edit-theme" class="p-6 flex flex-col gap-6 max-w-2xl mx-auto w-full">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-text-color">
        {{ isNew ? 'Nouveau Thème' : 'Modifier Thème' }}
      </h2>
      <button @click="backToMenu" class="btn btn-interactive btn-secondary p-2">Annuler</button>
    </div>

    <div class="flex flex-col gap-2">
      <label for="theme-name" class="text-text-color font-semibold">Nom du thème</label>
      <input
        id="theme-name"
        v-model="themeName"
        type="text"
        placeholder="Ex: Super Héros"
        class="p-3 rounded-xl bg-accent-color/10 border-2 border-accent-color/20 text-text-color focus:border-primary-color outline-none"
      />
    </div>

    <div class="flex flex-col gap-2 flex-grow">
      <label for="theme-words" class="text-text-color font-semibold">Mots (un par ligne)</label>
      <textarea
        id="theme-words"
        v-model="wordsText"
        placeholder="Entrez vos mots ici..."
        class="p-3 rounded-xl bg-accent-color/10 border-2 border-accent-color/20 text-text-color focus:border-primary-color outline-none h-64 resize-none"
      ></textarea>
    </div>

    <div class="flex flex-col gap-3 mt-4">
      <button @click="saveTheme" class="btn btn-interactive btn-primary py-4">Sauvegarder</button>

      <button v-if="!isNew" @click="deleteTheme" class="btn btn-interactive btn-secondary py-4">
        Supprimer ce thème
      </button>
    </div>

    <Modal
      :isVisible="showDeleteConfirm"
      @update:isVisible="showDeleteConfirm = $event"
      :type="'confirm'"
      :message="`Êtes-vous sûr de vouloir supprimer le thème '${props.title}' ?`"
      @confirmed="handleDeleteConfirmed"
    />

    <Modal
      :isVisible="showValidationAlert"
      @update:isVisible="showValidationAlert = $event"
      :type="'alert'"
      :message="validationMessage"
    />
  </div>
</template>

<style scoped></style>
