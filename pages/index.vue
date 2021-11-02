<template>
  <div>
    <ul>
      <div v-if="loading"></div>
      <div v-for="item in list" :key="item.id">
        {{ item.id }}
        {{ item.name }}
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api';
import useAccessor from '~/composables/useAccessor';

export default defineComponent({
  setup() {
    const { characters } = useAccessor();

    onMounted(() => {
      characters.fetch({ name: 'Fulano', limit: 5 });
    });

    return {
      list: computed(() => characters.state.data),
      loading: computed(() => characters.state.loading),
    };
  },
});
</script>
