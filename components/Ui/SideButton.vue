<template>
  <button
    v-bind="$attrs"
    :class="['u-bg-dark-glass', 'u-text-lighted-alt', `--${props.variant}`]"
    @click="click"
  >
    <span class="Icon">
      {{ (props.variant === 'increment' && '+') || (props.variant === 'decrement' && '-') }}
    </span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

type Props = {
  variant: 'increment' | 'decrement';
};

export default defineComponent({
  props: {
    variant: String,
  },
  setup(props, context) {
    return {
      click: (e: Event) => context.emit('click', e),
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  appearance: none;
  height: 72px;
  font-size: 16px;

  &.--increment {
    &::before {
      border-radius: 6px 0 0 6px;
    }
  }

  &.--decrement {
    &::before {
      border-radius: 0 6px 6px 0;
    }
  }

  &:active,
  &:hover {
    filter: brightness(2);
    transform: scale(1.05);
  }
}

.Icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>