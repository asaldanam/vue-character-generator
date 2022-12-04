<template>
  <div
    class="Description"
    :class="[{ '--open': open }]"
  >
    <div v-html="description" />
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    description: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
});
</script>
<style lang="scss" scoped>
@mixin open() {
  opacity: 1;
  height: auto;
  padding-top: 12px;
}

.Description {
  position: relative;
  font-size: 13px;
  line-height: 1.5;
  opacity: 0;
  height: 0px;

  &.--open {
    @include open();
    transition: opacity 0.2s linear 0.1s;
  }

  @media (min-width: 600px) {
    @include open();
    font-size: 15px;
  }

}
</style>
<style lang="scss">
.Description  {
  strong {
    white-space: nowrap;
    /* color: var(--theme-color-accent); */
  }

  .attr {
    align-items: center;
    text-transform: uppercase;
    color: var(--theme-color-text-inverse);
    border-radius: 19px;
    padding: 2px 6px 2px;
    display: inline-flex;
    font-size: 12px;
    position: relative;
    bottom: 1px;
    line-height: 1;
  }
}
</style>
