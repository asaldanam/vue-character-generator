<template>
  <UiHeader>
    <div class="CharacterHeader">
      <div
        :class="{ avatar: true, '--dashed': editMode }"
        :style="`background-image: url(${avatar})`"
        @click="updateAvatar"
      />
      <div class="text">
        <input
          :value="name"
          :readonly="!editMode"
          placeholder="Nombre"
          type="text"
          :class="{ 'input-name': true, '--styled': !editMode }"
          @change="({ target: { value } }) => updateInfo({ name: value })"
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

export default defineComponent({
  setup() {
    const [character, { updateInfo, setEditMode }] = useCharacterSheet.injectors();
    const name = computed(() => character.data?.info.name);
    const title = computed(() => character.data?.info.title);
    const avatar = computed(() => character.data?.info.avatar);
    const editMode = computed(() => character?.editMode);

    const updateAvatar = () => {
      if (!editMode.value) return;
      const avatar = window.prompt('Introduce url a la imagen');
      if (!avatar) return;

      updateInfo({ avatar });
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
  --_size: 64px;
  flex: 0 0 auto;
  height: var(--_size);
  width: var(--_size);
  margin-right: 16px;

  border-radius: 99px;
  border: 1px dashed transparent;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  background-color: rgba(255, 255, 255, 0.07);

  &.--dashed {
    border-color: var(--theme-color-bg-light);
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

  &:focus {
    outline: none;
  }

  &:not(:read-only) {
    border-color: var(--theme-color-bg-light);
    background: rgba(255, 255, 255, 0.07);
  }
}
</style>