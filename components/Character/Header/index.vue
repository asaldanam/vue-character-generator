<template>
  <UiHeader>
    <div class="CharacterHeader">
      <div :class="{ avatar: true, '--edit-mode': editMode }" @click="updateAvatar">
        <div class="avatar-img-container">
          <img v-if="avatar" :src="avatar" alt="" />
        </div>
      </div>
      <div class="text">
        <input
          :value="name"
          :readonly="!editMode"
          placeholder="Nombre"
          type="text"
          :class="{ 'input-name': true, '--styled': !editMode }"
          @input="({ target: { value } }) => updateInfo({ name: value })"
        />
        <input
          :value="title"
          :readonly="!editMode"
          placeholder="Título o profesión"
          type="text"
          class="input-title"
          @change="({ target: { value } }) => updateInfo({ title: value })"
        />
      </div>
      <CharacterHeaderMenu class="Menu" v-if="!editMode">
        <div slot="0" @click="() => setEditMode(true)">Editar</div>
      </CharacterHeaderMenu>
    </div>
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

      updateInfo({ avatar: newAvatar || avatar.value });
    };

    return { name, title, avatar, editMode, updateInfo, updateAvatar, setEditMode };
  },
});
</script>

<style lang="scss" scoped>
.CharacterHeader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.Menu {
  align-self: flex-start;
  position: relative;
  /* top: -8px; */
  right: -8px;
}

.avatar {
  --_size: 72px;
  flex: 0 0 auto;
  height: var(--_size);
  width: var(--_size);
  margin-right: 16px;
  border-radius: 999px;
  border: 1px dashed transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    -45deg,
    rgba(248, 183, 0, 1) 10%,
    rgba(150, 111, 0, 1) 50%,
    rgba(248, 183, 0, 1) 90%
  );

  &.--edit-mode {
    border-color: var(--theme-color-bg-light);
    background: var(--theme-color-bg-dark);
  }
}

.avatar-img-container {
  border-radius: 999px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  overflow: hidden;
  background-color: var(--theme-color-bg-dark);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.text {
  flex: 1 1 auto;
  & > *:not(:last-child) {
    margin-bottom: 2px;
  }
}

.input-name {
  font-size: 20px;
  font-weight: bold;

  &.--styled {
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: -webkit-linear-gradient(
      top,
      #efd100,
      #e2a233 19%,
      #f0c328 30%,
      #fff1a3 43%,
      #ffe13e 50%,
      #fff 51%,
      #fff
    );
    background-size: 1em 2.5em;
    color: #f8b700;
  }
}

.input-title {
  font-size: 14px;
}

input {
  background: none;
  font-size: 16px;
  color: var(--theme-color-text);
  width: 100%;
  display: block;
  padding: 0px 3px 0px;
  max-width: 380px;

  &:focus {
    outline: none;
  }

  &:not(:read-only) {
    border-color: var(--theme-color-bg-light);
    background: rgba(255, 255, 255, 0.07);
  }
}
</style>
