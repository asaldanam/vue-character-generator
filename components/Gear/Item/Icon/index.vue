<template>
  <div class="GearItemIcon">
    <img class="Background" :src="require(`assets/img/equipment/gear-item/quality/icon-bg-${size}-${background}.webp`)" alt="">
    <img
      v-if="item || fallbackSlot"
      class="Icon"
      :class="{
        '--fallback': !item,
        '--large': size === 'large',
        '--small': size === 'small'
      }"
      :src="require(`assets/img/equipment/gear-item/${slot}-${icon}.webp`)" alt=""
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: null,
    },
    fallbackSlot: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'large'
    }
  },
  setup(props) {
    const icon = computed(() => props.item?.icon || 0);
    const slot = computed(() => props.item?.slot || props.fallbackSlot);
    const background = computed(() => {
      const colors = ['white', 'green', 'blue', 'yellow', 'orange'];
      const color = props.item ? colors[props.item.quality] : colors[0];
      return color;
    })

    return {
      icon,
      slot,
      background
    }
  },
})
</script>
<style lang="scss" scoped>
.GearItemIcon {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
}

.Background {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: var(--theme-color-bg-darker);
}

.Icon {
  position: relative;
  &.--fallback {
    opacity: 0.35;
    filter: sepia(0.5) contrast(0.85);
  }

  &.--large {
    width: 100%;
    height: auto;
  }

  &.--small {
    height: 100%;
    width: auto;
  }
}
</style>
