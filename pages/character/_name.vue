<template>
  <div style="display: contents">
    <DiceRoller />
    <Character />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import useCharaterSheet from '~/composables/stores/useCharacterStore';
import useDiceRollerStore from '~/composables/stores/useDiceRollerStore';

export default defineComponent({
  setup() {
    useCharaterSheet.providers();
    useDiceRollerStore.providers();
  },
});
</script>
