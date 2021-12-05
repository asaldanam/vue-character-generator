<template>
  <div style="background: lavender">
    <h2>Este es el hijo 2</h2>
    <button @click="handleClick">increment</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import useCounter from '~/composables/useCounter';

export default defineComponent({
  setup() {
    const { state, actions } = useCounter.injectors();

    const handleClick = () => {
      console.log('click');
      (actions as any).increment();
    };

    return {
      state,
      handleClick,
    };
  },
});
</script>
