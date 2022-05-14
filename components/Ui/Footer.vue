<template>
  <div class="UiFooter">
    <footer>
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
  background-color: var(--theme-color-bg-darker-alpha);
  backdrop-filter: var(--theme-backdrop-filter-default);
  position: fixed;
  z-index: 7;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 24px;
  backdrop-filter: blur(8px);
  /* box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.35); */
}
</style>