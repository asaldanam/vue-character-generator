<template>
  <div class="buttons">
    <v-btn @click="handleCancel" :disabled="!name">Cancelar</v-btn>
    <v-btn @click="handleSave" color="primary" :disabled="!name">Guardar</v-btn>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, useContext, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { params } = useContext();
    const [character, { load, save, setEditMode }] = useCharacterSheet.injectors();
    const name = computed(() => character?.data?.info.name);

    const handleCancel = () => {
      load(params.value.name);
      setEditMode(false);
    };

    const handleSave = () => {
      save(router);
      setEditMode(false);
    }

    return { name, handleCancel, handleSave, setEditMode };
  },
});
</script>

<style lang="scss" scoped>
.buttons {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 16px;
}
</style>
