<template>
  <UiFooter>
    <v-btn v-if="character.editMode" @click="handleCancel">Cancelar</v-btn>
    <v-btn v-if="character.editMode" @click="handleSave" color="primary">Guardar</v-btn>
    <v-btn v-if="!character.editMode" @click="() => setEditMode(true)" color="primary"
      >Editar</v-btn
    >
  </UiFooter>
</template>
<script lang="ts">
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { query } = useContext();
    const [character, { load, save, setEditMode }] = useCharacterSheet.injectors();

    const handleCancel = () => {
      const characterString = query.value?.character as string;
      load(characterString);
      setEditMode(false);
    };

    const handleSave = () => save(router);

    return { character, handleCancel, handleSave, setEditMode };
  },
});
</script>