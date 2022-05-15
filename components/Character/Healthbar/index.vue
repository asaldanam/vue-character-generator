<script lang="ts">
import { computed, defineComponent, ref, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

import { CALC_FNS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const router = useRouter();
    const [character, { updateCurrentHealth, save }] = useCharacterSheet.injectors();

    const dialog = ref(false);
    const dialogInput = ref<number | null>(null);
    const dialogInputRef = ref<Vue | null>(null);
    const dialogInputBarrier = ref<number | null>(null);
    const dialogType = ref<'increment' | 'decrement' | null>(null);

    const current = computed(() => character.data?.state.currentHealth || 0);
    const max = computed(() => CALC_FNS.healthBase(character.data?.stats.attr_vitality || 0));
    const progress = computed(() => Math.floor((current.value / max.value) * 100));

    const background = computed(
      () =>
        `linear-gradient(45deg, hsl(${progress.value}deg 85% 25%), hsl(${progress.value}deg 85% 50%))`,
    );

    const increment = () => {
      const cure = Number(dialogInput.value || 0);
      const health = cure + current.value >= max.value ? max.value : current.value + cure;
      console.log({ cure, current: current.value, health });
      closeDialog();
      updateCurrentHealth(health);
      save(router);
    };

    const decrement = () => {
      const damage = Number(dialogInput.value || 0);
      const health = damage >= current.value ? 0 : current.value - damage;
      closeDialog();
      updateCurrentHealth(health);
      save(router);
    };

    const openDialog = (type: typeof dialogType['value']) => {
      dialog.value = true;
      dialogType.value = type;
      setTimeout(() => {
        (document.querySelector('[data-focus]') as any).focus();
      });
    };

    const closeDialog = () => {
      dialogInput.value = null;
      dialogInputBarrier.value = null;
      dialog.value = false;
      dialogType.value = null;
    };

    return {
      current,
      max,
      background,
      progress,
      dialog,
      dialogInput,
      dialogInputRef,
      dialogInputBarrier,
      dialogType,
      closeDialog,
      openDialog,
      increment,
      decrement,
    };
  },
});
</script>

<template>
  <div class="CharacterHealthbar">
    <div class="healthbar">
      <v-btn
        class="bar-button"
        color="primary"
        @click="() => openDialog('decrement')"
        :disabled="current <= 0"
      >
        -
      </v-btn>

      <div class="bar-container">
        <div class="bar">
          <div
            class="bar-progress"
            :style="{ background, transform: `translateX(-${100 - progress}%)` }"
          ></div>
          <div class="bar-text">{{ current }}/{{ max }}</div>
        </div>
      </div>

      <v-btn
        class="bar-button"
        color="primary"
        @click="() => openDialog('increment')"
        :disabled="current >= max"
      >
        +
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="310px">
      <v-card dark>
        <v-card-title dark></v-card-title>

        <v-card-text>
          <div v-if="dialogType === 'increment'">
            Indica la cantidad de puntos de vida que has recibido por sanación o barrera.
          </div>
          <div v-if="dialogType === 'decrement'">
            Indica la cantidad de puntos de vida que has recibido como daño.
          </div>
          <v-text-field
            :ref="dialogInputRef"
            data-focus
            placeholder="Puntos de vida"
            inputmode="numeric"
            v-model="dialogInput"
            type="number"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            v-if="dialogType === 'increment'"
            placeholder="Puntos de barrera"
            v-model="dialogInputBarrier"
            inputmode="numeric"
            type="number"
            hide-details="auto"
          ></v-text-field>
        </v-card-text>

        <!-- <v-divider></v-divider> -->

        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <v-btn color="secondary" @click="closeDialog">Cancelar</v-btn>
          <v-btn v-if="dialogType === 'decrement'" color="primary" @click="decrement"
            >Aplicar</v-btn
          >
          <v-btn v-if="dialogType === 'increment'" color="primary" @click="increment"
            >Aplicar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.CharacterHealthbar {
}

.healthbar {
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
  background: var(--theme-color-bg-darker);

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  border-radius: 8px;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  border: 1px solid var(--theme-color-bg-medium-light);
  box-shadow: inset 4px 2px 10px 0px rgb(0 0 0 / 50%);
}

.bar-progress {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(45deg, #267b06, #7acb1f);
  transition: all 1s cubic-bezier(0.76, 0, 0.24, 1);
  transform: translateX(-100%);
}

.bar-text {
  position: relative;
  /* mix-blend-mode: overlay; */
  font-weight: bolder;
  text-shadow: 0 1px 2px rgb(0 0 0 / 50%);
}

.bar-button {
  border-radius: 50%;
  width: 36px;
}

.v-card__text {
  text-align: center;
}

::v-deep .v-dialog {
  .v-card__actions {
    justify-content: space-between;
  }

  .v-input {
    font-size: 18px;
  }

  input {
    text-align: center;
  }
}
</style>