<template>
  <div style="background: red; padding: 1rem">
    <h1>Este es el padre</h1>
    <Child />
    <Child2 />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, readonly } from '@nuxtjs/composition-api';
import useCounter from '~/composables/useCounter';

export default defineComponent({
  setup() {
    useCounter.providers();
  },
});
</script>
