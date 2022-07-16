<template>
  <div class="Equipment">
    <div class="Gear">
      <div v-for="slot in slots" :key="slot" class="GearItem" @click="equipItem(slot)">
        <GearItemIcon :fallback-slot="slot" :item="getItem(slot)"/>
      </div>
      <div class="CentralContainer">
        <CharacterEquipmentInventory v-if="inventory === 'open'" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { EQUIPMENT_SLOTS } from '~/models/character/equipment/config';
import GearItem from '~/models/character/equipment/gear-item';
import { EquipmentSlots } from '~/models/character/equipment/types';
import { Stat } from '~/models/character/types';

export default defineComponent({
  setup() {
    const [character, {updateGear, addItemsToBag, save}] = useCharacterSheet.injectors();
    const slots = Object.keys(EQUIPMENT_SLOTS);
    const equipment = computed(() => character.data?.equipment);

    const inventory = ref<'closed' | 'open'>('closed')

    const getItem = (slot: string) => {
      if (!equipment.value) return null;
      const item = equipment.value.bag[equipment.value.gear[slot]];
      return item;
    }

    const equipItem = (slot: EquipmentSlots) => {
      if (equipment.value?.gear[slot]) {
        updateGear({ [slot]: null });
        inventory.value = 'closed'
        return;
      }
      const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
      const stats = [
        'attr_vitality',
        'attr_potency',
        'attr_tenacity',
      ].slice(0, random) as Stat[];

      const item = new GearItem().generate(slot, stats)
      addItemsToBag([item]);

      try {
        updateGear({ [slot]: item.id });
        save();
        inventory.value = 'open'
      } catch (e) {
        window.alert(e);
      }
    }

    return {
      equipment,
      slots,
      inventory,
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
  grid-template-columns: 44px 1fr 44px;
  grid-gap: 8px;
  max-width: 420px;
  margin: 0 auto;
}

.CentralContainer {
  grid-column: 2 / 3;
  grid-row: 1 / 4;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

