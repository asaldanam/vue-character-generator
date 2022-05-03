<template>
  <UiHeader>
    <div class="CharacterHeader">
      <div class="avatar" />
      <div class="text">
        <input
          :value="name"
          placeholder="Nombre"
          type="text"
          @change="({ target: { value } }) => updateInfo({ name: value })"
        />
        <input
          :value="title"
          placeholder="Título o profesión"
          type="text"
          @change="({ target: { value } }) => updateInfo({ title: value })"
        />
      </div>
    </div>
  </UiHeader>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

export default defineComponent({
  setup() {
    const [character, { updateInfo }] = useCharacterSheet.injectors();
    const name = computed(() => character.data?.info.name);
    const title = computed(() => character.data?.info.title);

    return { name, title, updateInfo };
  },
});
</script>

<style lang="scss" scoped>
.CharacterHeader {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0;

  & > *:not(:last-child) {
    margin-right: 16px;
  }
}

.avatar {
  flex: 0 0 auto;
  height: 56px;
  width: 56px;
  border-radius: 99px;
  /* background: white; */
  /* opacity: 0.5; */
  border: 1px dashed var(--theme-color-bg-light);
}

.text {
  flex: 1 1 auto;
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
}

input {
  background: none;
  font-size: 14px;
  color: var(--theme-color-text);
  border-bottom: 1px dashed var(--theme-color-bg-light);
  width: 100%;
  display: block;
  padding: 0px 0px 1px;

  &:focus {
    outline: none;
  }
}
</style>