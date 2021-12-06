<template>
  <UiFooter v-if="character.hasChanges" class="container">
    <UiButton @click="cancel">Cancelar</UiButton>
    <UiButton @click="save" variant="primary">Guardar</UiButton>
  </UiFooter>
</template>
<script lang="ts">
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { query } = useContext();
    const [character, { load, saveToUrl }] = useCharacterSheet.injectors();

    const cancel = () => {
      const characterString = query.value?.character as string;
      if (characterString) {
        load(characterString);
      }
    };

    const save = () => {
      if (router) {
        saveToUrl(router);
      }
    };

    return { character, cancel, save };
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