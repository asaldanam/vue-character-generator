<template>
  <div class="UiFooter">
    <footer>
      <UiWrapper>
        <slot />
      </UiWrapper>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.UiFooter {
  height: 72px;
  width: 100%;
}
footer {
  background-color: var(--theme-color-bg-darkblue-backdrop);
  backdrop-filter: var(--theme-backdrop-filter-default);
  box-shadow: 0px -8px 16px 0px rgb(0 0 0 / 50%);
  position: fixed;
  z-index: 6;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  backdrop-filter: blur(8px);
  /* box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.35); */
}
</style>
