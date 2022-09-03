<script lang="ts">
import { computed, defineComponent, onMounted, ref, useRouter } from '@nuxtjs/composition-api';
import useCharacterSheet from '~/composables/stores/useCharacterStore';

import { CALC_FNS } from '~/models/character/stats';

export default defineComponent({
  setup() {
    const [character, { updateState, save }] = useCharacterSheet.injectors();
    const loaded = ref(false);

    const dialog = ref(false);
    const dialogInput = ref<number | null>(null);
    const dialogInputRef = ref<Vue | null>(null);
    const dialogInputShield = ref<number | null>(null);
    const dialogType = ref<'increment' | 'decrement' | null>(null);

    const currentHealth = computed(() => character.data?.state.currentHealth || 0);
    const currentBarrier = computed(() => character.data?.state.currentBarrier || 0);
    const max = computed(() => CALC_FNS.healthBase(character.data?.stats.attr_vitality || 0));
    const maxBarrier = computed(() => Math.floor(max.value / 2));

    const progress = computed(() => Math.floor((currentHealth.value / max.value) * 100));
    const progressBarrier = computed(() => Math.ceil((currentBarrier.value / max.value) * 100));
    const progressBarrierPosition = computed(() => {
      const barrierOverMaxHealth = progress.value + progressBarrier.value - 100;
      const start =
        barrierOverMaxHealth > 0 ? progress.value - barrierOverMaxHealth : progress.value;
      return start;
    });

    const background = computed(
      () =>
        `linear-gradient(45deg, hsl(${progress.value}deg 85% 25%), hsl(${progress.value}deg 85% 50%))`,
    );

    onMounted(() => { setTimeout(() => { loaded.value = true }) });

    const increment = () => {
      const cure = Number(dialogInput.value || 0);
      const shield = Number(dialogInputShield.value || 0);

      const hasOverhealth = cure + currentHealth.value >= max.value;
      const health = hasOverhealth ? max.value : currentHealth.value + cure;

      const hasOvershielded = shield + currentBarrier.value >= maxBarrier.value;
      const barrier = hasOvershielded ? maxBarrier.value : shield + currentBarrier.value;

      closeDialog();
      updateState({ currentHealth: health, currentBarrier: barrier });
      save();
    };

    const decrement = () => {
      const hit = Number(dialogInput.value || 0);
      const absorbed = currentBarrier.value > hit ? hit : currentBarrier.value;
      const damage = hit - absorbed;

      const barrier = damage ? 0 : currentBarrier.value - absorbed;
      const health = damage >= currentHealth.value ? 0 : currentHealth.value - damage;

      updateState({ currentHealth: health, currentBarrier: barrier });
      closeDialog();
      save();
    };

    const submit = (e) => {
      e.preventDefault();
      if (dialogType.value === 'increment') increment();
      if (dialogType.value === 'decrement') decrement();
    }

    const openDialog = (type: typeof dialogType['value']) => {
      dialog.value = true;
      dialogType.value = type;
      setTimeout(() => {
        const input = document.querySelector('[data-focus]') as any;
        input.focus();
      });
    };

    const closeDialog = () => {
      dialogInput.value = null;
      dialogInputShield.value = null;
      dialog.value = false;
      dialogType.value = null;
    };

    return {
      loaded,
      currentHealth,
      currentBarrier,
      max,
      background,
      progress,
      progressBarrier,
      progressBarrierPosition,
      dialog,
      dialogInput,
      dialogInputRef,
      dialogInputShield,
      dialogType,
      closeDialog,
      submit,
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
        :disabled="currentHealth <= 0"
      >
        -
      </v-btn>

      <div class="bar-container">
        <div class="bar">
          <div
            class="bar-progress-health"
            :class="{'--prevent-animation': !loaded}"
            :style="{ background, transform: `translateX(-${100 - progress}%)` }"
          ></div>
          <div
            class="bar-progress-barrier"
            :class="{'--prevent-animation': !loaded}"
            :style="{
              transform: `translateX(${progressBarrierPosition}%) scaleX(${progressBarrier / 100})`,
            }"
          ></div>
          <div class="bar-text">
            {{ currentHealth }} <span v-if="currentBarrier">(+{{ currentBarrier }})</span>
          </div>
        </div>
      </div>

      <v-btn class="bar-button" color="primary" @click="() => openDialog('increment')"> + </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="360px">
      <form class="form" @submit="submit">
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
              v-model="dialogInput"
              data-focus
              placeholder="Puntos de vida"
              inputmode="numeric"
              type="number"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-if="dialogType === 'increment'"
              v-model="dialogInputShield"
              placeholder="Puntos de barrera"
              inputmode="numeric"
              type="number"
              hide-details="auto"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="closeDialog">Cancelar</v-btn>
            <v-btn color="primary" type="submit">Aplicar</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.CharacterHealthbar {
  max-width: 560px;
  margin: 0 auto;
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

.bar-progress-health {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(45deg, #267b06, #7acb1f);
  transition: all 1s cubic-bezier(0.76, 0, 0.24, 1);
  transform: translateX(-100%);
}

.bar-progress-barrier {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: var(--theme-color-bg-light);
  opacity: 0.5;
  transition: all 1s cubic-bezier(0.76, 0, 0.24, 1);
  transform: translateX(0%) scaleX(0);
  transform-origin: left;
}

.--prevent-animation {
  transition: none;
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

.form {
  display: contents;
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
