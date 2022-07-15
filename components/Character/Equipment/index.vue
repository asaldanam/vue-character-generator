<template>
  <div class="Equipment">
    <div class="Gear">
      <div v-for="slot in slots" :key="slot" class="GearItem">
        <img src="~assets/img/equipment/gear-item/quality/tooltip-frame-white.webp" alt="">
        <img class="GearItemFallback" :src="require(`assets/img/equipment/gear-item/${slot}-0.webp`)" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from '@vue/composition-api'
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { EQUIPMENT_SLOTS } from '~/models/character/equipment/config';

export default defineComponent({
  setup() {
    const [character] = useCharacterSheet.injectors();
    const slots = Object.keys(EQUIPMENT_SLOTS);
    const gear = computed(() => character.data.equipment.gear);
    return {
      gear,
      slots
    }
  },
})
</script>
<style lang="scss" scoped>
.Equipment {
  padding: 16px 24px;
  height: 100%;
}

.Gear {
  --Equipment-icon-size: 40px;
  display: grid;
  grid-template-columns: 40px 40px;
  grid-column-gap: calc(100% - (40px * 2));
  grid-row-gap: 8px;
  max-width: 420px;
  margin: 0 auto;
}

.GearItem {
  position: relative;
  background-color: var(--theme-color-bg-darker);
  img {
    width: 100%;
    height: 100%;
  }
}

.GearItemFallback {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.35;
  filter: sepia(0.5) contrast(0.85);
}

</style>

