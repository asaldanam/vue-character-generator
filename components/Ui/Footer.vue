<template>
  <div class="UiFooter">
    <footer v-bind="$props">
      <slot />
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.UiFooter {
  height: 72px;
  width: 100%;
}
footer {
  background: var(--theme-color-bg-light);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 24px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.35);

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}
</style>