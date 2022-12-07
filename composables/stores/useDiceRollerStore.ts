import random from 'random';
import createStore from "~/shared/libs/createStore";

const diceRollAudio = new Audio('/audio/roll-dice.mp3')
diceRollAudio.volume = 0.5;

const failureAudio = new Audio('/audio/roll-failure.wav')
failureAudio.volume = 0.2;

const successAudio = new Audio('/audio/roll-success.wav')
successAudio.volume = 0.5;

export default createStore((
  state = {
    isOpen: false,
    roll: 0,
    hasSuccess: null as boolean | null,
    successMsg: '',
    failureMsg: '',
  }
) => {
  return {
    state,
    actions: {
      throwDice(payload: { success: number; successMsg?: string; failureMsg?: string; }) {
        state.isOpen = true;

        const randomUniformNumber = random.uniform(0, 1);
        const randomNumber = randomUniformNumber();

        // solo para D20
        const roll = Math.ceil(randomNumber * 20);
        const success = roll >= payload.success;

        setTimeout(() => {
          state.roll = roll;
          state.hasSuccess = success;
          state.successMsg = payload.successMsg || '';
          state.failureMsg = payload.failureMsg || '';
        })

        setTimeout(() => diceRollAudio.play(), 200)
        setTimeout(() => success ? successAudio.play() : failureAudio.play(), 1300)

      },
      close() {
        state.isOpen = false;
        state.roll = 0;
        state.hasSuccess = null;
        state.successMsg = '';
        state.failureMsg = '';
      }
    },
  }
});
