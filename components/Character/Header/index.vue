<template>
  <UiHeader>
    <UiCharacterCard
      :name="name"
      :title="title"
      :avatar="avatar"
      :edit-mode="editMode"
      @updateAvatar="updateAvatar"
      @updateInfo="updateInfo"
    >
      <template slot="right">
        <CharacterHeaderMenu v-if="!editMode">
          <div slot="0" @click="() => setEditMode(true)">Editar</div>
        </CharacterHeaderMenu>
      </template>
    </UiCharacterCard>
  </UiHeader>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { useCharacter } from '~/composables/stores/useCharacterStore';
import { useEditMode } from '~/composables/useEditMode';

export default defineComponent({
  setup() {
    const [state, { updateInfo }] = useCharacter();
    const { editMode, setEditMode } = useEditMode();
    const name = computed(() => state.character?.info.name);
    const title = computed(() => state.character?.info.title);
    const avatar = computed(() => state.character?.info.avatar);

    const updateAvatar = () => {
      if (!editMode.value) return;
      const newAvatar = window.prompt('Introduce url a la imagen', avatar.value || '');

      updateInfo({ avatar: newAvatar || '' });
    };

    return { name, title, avatar, editMode, updateInfo, updateAvatar, setEditMode };
  },
});
</script>
<style scoped>

</style>
