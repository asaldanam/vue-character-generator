<template>
  <div class="CharacterCard">
    <div
      :class="{ avatar: true, '--edit-mode': editMode }"
      @click="() => $emit('updateAvatar')"
    >
      <div class="avatar-img-container">
        <img :src="avatar || require('~/assets/img/avatar-fallback.png')" alt="" />
      </div>
    </div>
    <div class="text">
      <input
        :value="name"
        :readonly="!editMode"
        placeholder="Nombre"
        type="text"
        :class="{ 'input-name': true, '--styled': !editMode }"
        @input="({ target: { value } }) => $emit('updateInfo', { name: value })"
      />
      <input
        :value="title"
        :readonly="!editMode"
        placeholder="Título o profesión"
        type="text"
        class="input-title"
        @change="({ target: { value } }) => $emit('updateInfo', { title: value })"
      />
    </div>
    <div v-if="$slots.right" class="right-element">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    editMode: { type: Boolean, default: false },
    avatar: { type: String, default: '' },
    name: { type: String, default: '' },
    title: { type: String, default: '' },
  }
});
</script>

<style lang="scss" scoped>
.CharacterCard {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.right-element {
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
  cursor: inherit;

  &:focus {
    outline: none;
  }

  &:not(:read-only) {
    border-color: var(--theme-color-bg-light);
    background: rgba(255, 255, 255, 0.07);
  }
}
</style>
