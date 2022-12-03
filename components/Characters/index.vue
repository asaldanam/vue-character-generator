<template>
  <UiWrapper class="Characters">
    <NuxtLink
      v-for="([slug, character]) in characters"
      :key="slug"
      :to="`/character/${slug}`"
      class="card --character"
    >
      <UiCharacterCard
        :name="character.info.name"
        :title="character.info.title"
        :avatar="character.info.avatar"
      />
    </NuxtLink>
    <NuxtLink
      class="card --empty"
      to="/character"
    >
      <div class="empty-msg">
        <v-icon>mdi-plus-circle-outline</v-icon>
        <span>Nuevo personaje</span>
      </div>
    </NuxtLink>
  </UiWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const characters = computed(() => {
      const storageStr = localStorage.getItem('characters') || '{}';
      const storage = JSON.parse(storageStr);
      const list = Object.entries(storage);
      return list;
    });

    return {
      characters,
    };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 720px;
  padding-top: 24px;
  padding-bottom: 32px;
  display: grid;
  grid-gap: 24px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

.card {
  padding: 16px;
  transition: all .1s linear;
  min-height: 106px;
  display: block;

  &.--character {
    border: 1px solid var(--theme-color-bg-medium-light);
    background: var(--theme-color-bg-darkblue-backdrop);
    box-shadow: 0 0 14px 0 rgb(0, 0, 0, 0);
    &:hover {
      box-shadow: 0 0 14px 0 var(--theme-color-bg-black);
    }
  }

  &.--empty {
    border: 1px dashed var(--theme-color-accent-transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--theme-color-bg-light) !important;
  }
}

.empty-msg {
  display: flex;
  align-items: center;
  & > *:not(:last-child) { margin-right: 8px; }
  transform: scale(1.15);
  color: var(--theme-color-accent);

  span {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }
  i {
    color: inherit;
    font-size: 28px;
  }
}
</style>
