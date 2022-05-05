<template>
  <UiFooter>
    <v-btn v-if="editMode" @click="handleCancel">Cancelar</v-btn>
    <v-btn v-if="editMode" @click="handleSave" color="primary" :disabled="!name">Guardar</v-btn>
    <v-btn v-if="!editMode" @click="() => setEditMode(true)" color="primary">Editar</v-btn>
  </UiFooter>
</template>
<script lang="ts">
import { computed, defineComponent, useContext, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { params } = useContext();
    const [character, { load, save, setEditMode }] = useCharacterSheet.injectors();
    const editMode = computed(() => character?.editMode);
    const name = computed(() => character?.data?.info.name);

    const handleCancel = () => {
      load(params.value.name);
      setEditMode(false);
    };

    const handleSave = () => save(router);

    return { editMode, name, handleCancel, handleSave, setEditMode };
  },
});
</script>