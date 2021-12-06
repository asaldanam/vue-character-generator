<template>
  <button v-bind="$attrs" @click="click">
    <slot />
  </button>
</template>
script <script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup(props, context) {
    return {
      click: (e) => {
        context.emit('click', e);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  padding: 12px 16px;
  background: var(--theme-color-bg-dark);

  color: var(--theme-color-text-inverse);
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1;

  &[variant='primary'] {
    background: var(--theme-color-primary);
  }
}
</style>