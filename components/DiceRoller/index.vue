<template>
  <div v-if="state.isOpen" class="DiceRoller">
    <div class="backdrop" />
    <div class="roll-container">
      <div class="dice">
        <div
          class="dice-shadow"
          :style="`background: radial-gradient(circle, ${color} 20%, ${color}00 70%);`"
        />
        <DiceRollerD20 :roll="state.roll" />
      </div>
      <footer class="footer">
        <div class="roll-text" :style="`color: ${color}`">{{state.hasSuccess ? '¡Éxito!' : '¡Has fallado!'}}</div>
        <UiDescription
          v-if="state.hasSuccess && state.successMsg"
          class="description"
          :description="state.successMsg"
          open
        />
        <v-btn class="go-back-button" color="secondary" type="button" @click="close">Volver a la ficha</v-btn>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from '@nuxtjs/composition-api';
import useDiceRollerStore from '~/composables/stores/useDiceRollerStore';
import useBodyLock from '~/composables/useBodyLock';

export default defineComponent({
  setup() {
    const [state, { close }] = useDiceRollerStore.injectors();
    const { lockBody, unlockBody } = useBodyLock();

    watch(
      () => state.value.isOpen,
      (isOpen) => {
        unlockBody();
        if (isOpen) { lockBody() }
      }
    )

    const color = computed(() => {
      if (state.value.hasSuccess === null) return 'transparent';
      return state.value.hasSuccess ? '#00772a' : '#FF0000';
    })

    return {
      state,
      color,
      close,
    }
  },
});
</script>
<style lang="scss" scoped>
  .DiceRoller {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 100;
    padding: 20% 24px 48px;
    display: flex;
    align-items: center;
    @media (min-width: 720px) {
      padding: 24px 24px 15%;
    }
  }

  .roll-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 420px;
    margin: 0 auto;
    height: auto;
  }

  @keyframes backdrop-fade-in {
    0%  { opacity: 0; }
    100%  { opacity: 0.97; }
  }

  .backdrop {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: var(--theme-color-bg-dark);
    opacity: 0;
    animation: backdrop-fade-in 0.2s linear forwards;
    pointer-events: none;
  }


  @keyframes dice-fade-in {
    0%  { opacity: 0; transform: translateY(100%); }
    100%  { opacity: 1; transform: translateY(0); }
  }

  .dice {
    animation: dice-fade-in 0.5s ease-in-out forwards;
    opacity: 0;
    position: relative;
  }

  @keyframes dice-shadow-fade-in {
    0%  { opacity: 0; }
    100%  { opacity: 1; }
  }

  .dice-shadow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    transform: scale(1.4);
    opacity: 0;
    animation: dice-shadow-fade-in 0.3s linear forwards 1s;
  }


  @keyframes footer-fade-in {
    0%  { opacity: 0; }
    100%  { opacity: 1; }
  }

  .footer {
    margin-top: auto;
    color: white;
    position: relative;
    padding-top: 96px;
    animation: footer-fade-in 0.3s linear forwards 1s;
    opacity: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .roll-text {
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    filter: brightness(1.8) saturate(0.75);

    @media (min-width: 720px) {
      margin-bottom: 8px;
      font-size: 32px;
    }
  }

  .description {
    text-align: center;
    font-size: 14px;
    @media (min-width: 720px) {
      font-size: 16px;
    }
  }

  .go-back-button {
    margin: 32px auto 0px;
  }
</style>
