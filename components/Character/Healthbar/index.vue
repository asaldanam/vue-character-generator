<script lang="ts">
import { computed, defineComponent, useContext, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { useKeepPressing } from '~/composables/useKeepPressing';

import { CALC_FNS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { relese, whilePress } = useKeepPressing();
    const [character, { updateCurrentHealth, save }] = useCharacterSheet.injectors();

    const current = computed(() => character.data?.state.currentHealth || 0);
    const max = computed(() => CALC_FNS.healthBase(character.data?.stats.attr_vitality || 0));

    const increment = () =>
      whilePress(() => {
        if (current.value >= max.value) return;
        updateCurrentHealth(current.value + 1);
        save(router);
      });

    const decrement = () =>
      whilePress(() => {
        if (current.value <= 1) return;
        updateCurrentHealth(current.value - 1);
        save(router);
      });

    return {
      current,
      max,
      whilePress,
      relese,
      increment,
      decrement,
    };
  },
});
</script>

<template>
  <div class="CharacterHealthbar">
    <v-btn
      color="primary"
      @touchstart="decrement"
      @touchend="relese"
      @mousedown="decrement"
      @mouseup="relese"
    >
      -
    </v-btn>

    <div class="bar-container">{{ current }}/{{ max }}</div>

    <v-btn
      color="primary"
      @touchstart="increment"
      @touchend="relese"
      @mousedown="increment"
      @mouseup="relese"
    >
      +
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.CharacterHealthbar {
  display: flex;
}
.bar-container {
  flex: 1 1 100%;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;
}

.bar {
}
</style>