<template>
  <footer>
    <slot />
  </footer>
</template>
<style lang="scss" scoped>
footer {
  background: var(--theme-color-bg-light);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 24px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.35);
}
</style>