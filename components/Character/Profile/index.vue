<template>
  <div class="Profile">
      <div class="ProfileBg --fallback">
        <img src="~assets/img/profile/fallback-bg.jpeg" alt="">
      </div>
      <CharacterHeader />
      <CharacterEquipment />
  </div>
</template>
<style lang="scss" scoped>
  .Profile {
    position: relative;
    background-color: var(--theme-color-bg-darker);
    overflow: hidden;
    /* min-height: 50vw; */

    & > * {
      position: relative;
    }
  }

  .ProfileBg {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    filter: grayscale(1) sepia(0.5);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
</style>
