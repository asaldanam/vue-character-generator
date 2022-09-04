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
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { useEditMode } from '~/composables/useEditMode';

export default defineComponent({
  setup() {
    const [character, { updateInfo }] = useCharacterSheet.injectors();
    const { editMode, setEditMode } = useEditMode();
    const name = computed(() => character.data?.info.name);
    const title = computed(() => character.data?.info.title);
    const avatar = computed(() => character.data?.info.avatar);

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
