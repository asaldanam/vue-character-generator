<template>
  <div class="Inventory">
    <div class="Container">
      <div v-for="(_, slot) in Array.from({length: 30})" :key="slot" class="Slot">
        <img class="SlotBackground" src="~assets/img/equipment/gear-item/quality/icon-bg-small-white.webp" alt="">
        <!-- <div>{{ slot }}</div> -->
        <GearItemIcon :item="inventory[slot]" size="small" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

export default defineComponent({
  setup() {
    const [character] = useCharacterSheet.injectors();
    const inventory = computed(() => Object.values(character.data?.equipment?.bag || {}));

    return {
      inventory
    }
  },
})
</script>

<style lang="scss" scoped>
.Inventory {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Container {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(5, 40px);
  grid-template-rows: repeat(6, 40px);
}

.Slot {
  position: relative;
  background: rgb(15 15 15 / 80%);
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.SlotBackground {
  opacity: 0.5;
}

</style>
