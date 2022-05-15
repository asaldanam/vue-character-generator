<template>
  <div class="UiHeader">
    <header>
      <slot />
    </header>
  </div>
</template>
<style lang="scss" scoped>
.UiHeader {
  /* --_height: 72px; */
  /* height: var(--_height); */
  width: 100%;
}

header {
  background: var(--theme-color-bg-darker);
  border-bottom: 1px solid var(--theme-color-bg-medium-light);
  /* height: var(--_height); */
  /* position: fixed;
  z-index: 99; */
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px 24px;
  /* box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.35); */
}
</style>