<template>
  <ul>
    <li v-for="character in characters" :key="character">
      <NuxtLink :to="`/character/${character}`">{{ character }}</NuxtLink>
    </li>

    <li>
      <NuxtLink to="/character">Nuevo personaje</NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const characters = computed(() => {
      const storageStr = localStorage.getItem('characters') || '{}';
      const storage = JSON.parse(storageStr);
      const list = Object.keys(storage);
      return list;
    });

    return {
      characters,
    };
  },
});
</script>
<style lang="scss" scoped>
a {
  color: white !important;
}
</style>
