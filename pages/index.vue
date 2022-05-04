<template>
  <ul>
    <li v-for="character in characters" :key="character">
      <a :href="`/character/${character}`">{{ character }}</a>
    </li>

    <li>
      <a href="/character">Nuevo personaje</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, useRouter } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const router = useRouter();
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
  color: white;
}
</style>
