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
    const { list } = characters;

    onMounted(() => {
      list.fetch({ limit: 5, name: 'asdfasdf' });
    });

    return {
      list: computed(() => list.state.data),
      loading: computed(() => list.state.loading),
    };
  },
});
</script>
