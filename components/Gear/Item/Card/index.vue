<template>
  <div v-if="item" class="GearItemCard">
    <div class="background">
      <img class="background-body" src="~assets/img/equipment/gear-item/quality/frames/body-white.webp">
      <img class="background-head" src="~assets/img/equipment/gear-item/quality/frames/head-white.webp">
      <img class="background-footer" src="~assets/img/equipment/gear-item/quality/frames/footer-white.webp">
    </div>

    <div class="card-container">

      <div class="card-core">
        <div class="icon">
          <GearItemIcon :item="item" />
        </div>
        <div>
          <p class="card-title" :style="{ color }">Yelmo del aspirante malicioso</p>
          <ul class="card-stats">
            <li v-for="stat in stats" :key="stat.name">
              +{{stat.value}} {{stat.name}}
            </li>
          </ul>
        </div>
      </div>

      <hr class="divider">
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { CHARACTER_STATS_CONFIG } from '~/models/character/config';
import GearItem from '~/models/character/equipment/gear-item';
import { GEAR_ITEM_COLOR_BY_QUALITY } from '~/models/character/equipment/gear-item/config';

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: null,
    }
  },
  setup(props: { item: GearItem }) {
    console.log(props)
    return {
      color: computed(() => {
        const colors = GEAR_ITEM_COLOR_BY_QUALITY;
        const color = props.item ? colors[props.item.quality] : colors[0];
        return color;
      }),
      stats: computed(() => {
        return Object.entries(props.item?.stats || {})
          .map(([stat, value]) => {
            return {
              name: CHARACTER_STATS_CONFIG[stat].txt.es.name,
              value,
            }
          })
      })
    }
  },
})
</script>
<style lang="scss" scoped>
.GearItemCard {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 56px 32px;

  min-height: 300px;

  & > * { position: relative; }
}

.card-title {
  /* text-align: center; */
  font-size: 18px;
  line-height: 1.25;
  margin-bottom: 8px;
}

.divider {
  margin: 16px 0px;
  border-color: rgba(108,159,244,0.1);
}

.card-core {
  display: flex;
  grid-template-columns: 40px 1fr;
  align-items: flex-start;
  grid-gap: 16px;
  margin: 8px 0;
}

.icon {
  font-family: 'exocet';
}

.card-stats {
  list-style: none;
  padding: 0;
  color: lawngreen;

  li {
    font-size: 14px;
    margin-bottom: 2px;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    position: absolute;
    left: 50%;
    width: 100%;
  }

  &-head {
    top: 0;
    transform: translateX(-50%);
  }

  &-body {
    top: 0;
    height: calc(100% - 56px);
    transform: translate(-50%, 12px);
  }

  &-footer {
    bottom: 0;
    transform: translateX(-50%);
  }
}
</style>
