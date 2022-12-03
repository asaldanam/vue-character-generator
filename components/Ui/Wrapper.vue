<template>
  <div class="wrapper">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding-left: 16px;
  padding-right: 16px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 720px) {
  padding-left: 24px;
  padding-right: 24px;
  }
}
</style>
