<template>
  <UiFooter v-if="character.editMode" class="container">
    <UiButton @click="handleCancel">Cancelar</UiButton>
    <UiButton @click="handleSave" variant="primary">Guardar</UiButton>
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
      if (!characterString) return;
      load(characterString);
      setEditMode(false);
    };

    const handleSave = () => save(router);

    return { character, handleCancel, handleSave };
  },
});
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}
</style>