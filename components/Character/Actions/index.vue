<template>
  <div class="buttons">
    <v-btn v-if="!params.name" @click="handleGoback">Volver</v-btn>
    <v-btn v-if="params.name" @click="handleCancel" :disabled="!name">Cancelar</v-btn>
    <v-btn @click="handleSave" color="primary" :disabled="!name">Guardar</v-btn>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, useContext, useRouter } from '@nuxtjs/composition-api';
import slugify from 'slugify';
import { useCharacter } from '~/composables/stores/useCharacterStore';
import { useEditMode } from '~/composables/useEditMode';

export default defineComponent({
  setup() {
    const { params } = useContext();
    const { setEditMode } = useEditMode();
    const router = useRouter();
    const [state, { load, save }] = useCharacter();
    const name = computed(() => state.character?.info.name);

    const handleCancel = () => {
      const slug = slugify(params.value.name?.toLowerCase() || '')
      load(slug);
      setEditMode(false);
    };

    const handleGoback = () => {
      router.push('/');
    };

    const handleSave = () => {
      if (!name.value) return;
      save();
      router.push({ params: { name: slugify(name.value.toLowerCase()) } });
    };

    return { params, name, handleCancel, handleSave, setEditMode, handleGoback };
  },
});
</script>

<style lang="scss" scoped>
.buttons {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 16px;

  @media (min-width: 720px) {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
