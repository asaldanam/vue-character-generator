<template>
  <div>
    <div>{{ params.slug }}</div>
    <div>{{ character && character.name }}</div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api';
import useAccessor from '~/composables/useAccessor';

export default defineComponent({
  setup() {
    const { params } = useContext();
    const { characters } = useAccessor();
    const { detail } = characters;

    onMounted(() => {
      detail.fetch({ id: params.value.slug });
    });

    return {
      params,
      character: computed(() => detail.state.data),
    };
  },
});
</script>
