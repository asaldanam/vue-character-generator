<script lang="ts">
import { computed, defineComponent, watch, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';
import { useKeepPressing } from '~/composables/useKeepPressing';

import { CALC_FNS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { cancelTouch, whilePress } = useKeepPressing();
    const [character, { updateCurrentHealth, save }] = useCharacterSheet.injectors();

    const current = computed(() => character.data?.state.currentHealth || 0);
    const max = computed(() => CALC_FNS.healthBase(character.data?.stats.attr_vitality || 0));
    const progress = computed(() => Math.floor((current.value / max.value) * 100));

    const background = computed(
      () =>
        `linear-gradient(45deg, hsl(${progress.value}deg 85% 25%), hsl(${progress.value}deg 85% 50%))`,
    );

    const increment = () => {
      const cure = parseInt(window.prompt('Indica la cantidad de vida sanada') || '0');
      if (isNaN(cure)) return;
      const health = cure + current.value >= max.value ? max.value : current.value + cure;
      updateCurrentHealth(health);
      save(router);
    };

    const decrement = () => {
      const damage = parseInt(window.prompt('Indica el daño recibido') || '0');
      if (isNaN(damage)) return;
      const health = damage >= current.value ? 0 : current.value - damage;
      updateCurrentHealth(health);
      save(router);
    };

    return {
      current,
      max,
      background,
      progress,
      whilePress,
      cancelTouch,
      increment,
      decrement,
    };
  },
});
</script>

<template>
  <div class="CharacterHealthbar">
    <v-btn color="primary" @click="decrement" :disabled="current <= 0"> - </v-btn>

    <div class="bar-container">
      <div class="bar">
        <div
          class="bar-progress"
          :style="{ background, transform: `translateX(-${100 - progress}%)` }"
        ></div>
        <div class="bar-text">{{ current }}/{{ max }}</div>
      </div>
    </div>

    <v-btn color="primary" @click="increment" :disabled="current >= max"> + </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.CharacterHealthbar {
  display: flex;
}
.bar-container {
  flex: 1 1 100%;
  user-select: none;
  padding: 0 12px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.bar {
  position: relative;
  background: var(var(--theme-color-bg-medium));

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px var(--theme-color-bg-medium-light);
}

.bar-progress {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(45deg, #267b06, #7acb1f);
  transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);
}

.bar-text {
  position: relative;
  /* mix-blend-mode: overlay; */
  font-weight: bolder;
}

button {
  border-radius: 50%;
  width: 36px;
}
</style>