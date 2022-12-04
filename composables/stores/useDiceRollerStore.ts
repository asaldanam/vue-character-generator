import { ref } from "@nuxtjs/composition-api";
import random from 'random';
import { createStore } from "~/shared/libs/createStore";

export default createStore(() => {
  const state = ref({
    isOpen: false,
    roll: 0,
    hasSuccess: null as boolean | null,
    successMsg: '',
    failureMsg: '',
  });

  return {
    state,
    actions: {
      throwDice(payload: { success: number; successMsg?: string; failureMsg?: string; }) {
        state.value.isOpen = true;

        setTimeout(() => {
          const randomUniformNumber = random.uniform(0, 1);
          const randomNumber = randomUniformNumber();

          // solo para D20
          state.value.roll = Math.ceil(randomNumber * 20);

          state.value.hasSuccess = state.value.roll >= payload.success;
          state.value.successMsg = payload.successMsg || '';
          state.value.failureMsg = payload.failureMsg || '';
        })
      },
      close() {
        state.value.isOpen = false;
        state.value.roll = 0;
        state.value.hasSuccess = null;
        state.value.successMsg = '';
        state.value.failureMsg = '';
      }
    },
  }
});
