<script lang="ts" setup>
import { ref, useSlots, useAttrs, computed } from '@nuxtjs/composition-api';

const slots = useSlots();

const open = ref(false);

const slotsList = computed(() => Object.keys(slots));
</script>

<template>
  <div class="CharacterHeaderMenu" v-bind="$attrs">
    <v-btn dark icon @click="open = !open">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-navigation-drawer v-model="open" temporary right fixed dark>
      <v-list nav dense>
        <v-subheader>OPCIONES</v-subheader>
        <v-list-item-group dark>
          <v-list-item v-for="(item, i) in slotsList" :key="i" @click="open = false" dark>
            <slot :name="item"></slot>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss" scoped>
::v-deep {
  .theme--dark.v-navigation-drawer {
    background: transparent;
    background-color: var(--theme-color-bg-darkblue-backdrop);
    backdrop-filter: var(--theme-backdrop-filter-default);

    /* & > * {
      position: relative;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      background-color: var(--theme-color-bg-darker);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    } */
  }

  .v-list-item {
    & > * {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
