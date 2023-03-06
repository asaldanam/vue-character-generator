<template>
  <header class="UiBlockHeader">
    <div class="UiBlockHeader-content">
      <div class="header-title u-text-alt">{{ title }}</div>
      <slot />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.UiBlockHeader {
  background: var(--theme-color-bg-dark);
  /* color: var(--theme-color-accent); */

  margin-left: -16px;
  margin-right: -16px;
  padding: 16px;

  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -o-sticky;
  position: -ms-sticky;

  /* background: var(--theme-color-bg-dark) url('~assets/img/header-bg.webp') repeat-x 80px 0; */

  top: 0;
  z-index: 5;

  @media (min-width: 720px) {
    margin: 0;
    padding-left: 0;
    /* box-shadow: 0 7px 21px rgb(0 0 0 / 25%); */
    padding-right: 0;
    border-bottom: 1px solid var(--theme-color-bg-light);
    background: var(--theme-color-bg-medium);
  }

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-title {
    line-height: 24px;
    text-transform: uppercase;
  }
}
</style>
