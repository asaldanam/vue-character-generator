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
  background: var(--theme-color-bg-darker);
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 24px;
  backdrop-filter: blur(8px);
  /* box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.35); */

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 16px;
}
</style>