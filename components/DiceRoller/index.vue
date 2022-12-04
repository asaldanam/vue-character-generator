<template>
  <div v-if="state.isOpen" class="DiceRoller">
    <div class="backdrop" />
    <div class="dice">
      <div
        class="dice-shadow"
        :style="`background: radial-gradient(circle, ${color} 20%, ${color}00 70%);`"
      />
      <DiceRollerD20 :roll="state.roll" />
    </div>
    <footer class="footer">
      <UiDescription description="asdfasdf" open />
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api';
import useDiceRollerStore from '~/composables/stores/useDiceRollerStore';

export default defineComponent({
  setup() {
    const [state, { throwDice }] = useDiceRollerStore.injectors();

    onMounted(() => {
      // throwDice({ success: 10 });
    });

    const color = computed(() => {
      if (state.hasSuccess === null) return 'transparent';
      return state.hasSuccess ? '#00772a' : '#FF0000';
    })

    return {
      state,
      color,
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

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 20% 24px 10%;
  }

  @keyframes backdrop-fade-in {
    0%  { opacity: 0; }
    100%  { opacity: 0.95; }
  }

  .backdrop {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: var(--theme-color-bg-dark);
    pointer-events: none;
    opacity: 0;
    animation: backdrop-fade-in 0.2s linear forwards;
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

  .footer {
    margin-top: auto;
  }
</style>
