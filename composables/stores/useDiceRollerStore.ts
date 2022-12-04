import random from 'random'
import { reactive } from "@nuxtjs/composition-api";
import { createStore } from "~/shared/libs/createStore";

export default createStore(() => {
  const state = reactive({
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
        state.isOpen = true;
        state.roll = 0;
        state.hasSuccess = null;

        setTimeout(() => {
          const randomUniformNumber = random.uniform(0, 1);
          const randomNumber = randomUniformNumber();

          // solo para D20
          state.roll = Math.ceil(randomNumber * 20);

          state.hasSuccess = state.roll >= payload.success;
          state.successMsg = payload.successMsg || '';
          state.failureMsg = payload.failureMsg || '';
        })
      }
    },
  }
});
