<template>
  <div style="background: green">
    <h2>Este es el hijo 1</h2>
    <div>{{ state.count }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import useCounter from '~/composables/useCounter';

export default defineComponent({
  setup() {
    const [state] = useCounter.injectors();

    return {
      state,
    };
  },
});
</script>
