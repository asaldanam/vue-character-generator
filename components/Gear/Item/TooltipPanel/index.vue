<template>
  <v-menu
    v-model="menu"
    open-on-hover
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="trigger"
        v-bind="attrs"
        v-on="on"
      >
        <slot name="trigger" />
      </v-btn>
    </template>

    <div>
      <slot name="tooltip" />
    </div>
  </v-menu>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const menu = ref(false);
    return {
      menu,
    }
  },
})
</script>
<style lang="scss" scoped>
.trigger {
  &.theme--light.v-btn.v-btn--has-bg {
    background: transparent;
  }
  &.v-btn:not(.v-btn--round).v-size--default {
    height: 100%;
    padding: 0;
  }
  &.v-btn:before {
    display: none;
  }
  margin: 0;
  height: auto;
  width: 100%;
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
  font-weight: unset;
  position: unset;

  ::v-deep {
    .v-btn__content {
      display: contents;
    }
  }
}

</style>

