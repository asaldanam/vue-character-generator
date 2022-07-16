<template>
  <div class="Equipment">
    <div class="Gear">
      <div v-for="slot in slots" :key="slot" class="GearItem" @click="equipItem(slot)">
        <img src="~assets/img/equipment/gear-item/quality/tooltip-frame-white.webp" alt="">
        <img v-if="getItem(slot)" class="GearItemImg" :src="require(`assets/img/equipment/gear-item/${slot}-0.webp`)" alt="">
        <img v-else class="GearItemImg --fallback" :src="require(`assets/img/equipment/gear-item/${slot}-0.webp`)" alt="">
      </div>
    </div>
    <!-- <button @click="prueba({})">prueba</button> -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { EQUIPMENT_SLOTS } from '~/models/character/equipment/config';
import GearItem from '~/models/character/equipment/gear-item';
import { EquipmentSlots } from '~/models/character/equipment/types';

export default defineComponent({
  setup() {
    const [character, {updateGear, addItemsToBag, save}] = useCharacterSheet.injectors();
    const slots = Object.keys(EQUIPMENT_SLOTS);
    const equipment = computed(() => character.data?.equipment);

    const getItem = (slot: string) => {
      if (!equipment.value) return null;
      return equipment.value.bag[equipment.value.gear[slot]];
    }

    const equipItem = (slot: EquipmentSlots) => {
      if (equipment.value?.gear[slot]) {
        updateGear({ [slot]: null });
        return;
      }

      const item = new GearItem({ stats: { attr_potency: 50, }, slot})
      addItemsToBag([item]);

      try {
        updateGear({ [slot]: item.id });
        save();
      } catch (e) {
        window.alert(e);
      }
    }

    return {
      equipment,
      slots,
      getItem,
      equipItem
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

.GearItemImg {
  position: absolute;
  left: 0;
  top: 0;
  &.--fallback {
    opacity: 0.35;
    filter: sepia(0.5) contrast(0.85);
  }
}

</style>

