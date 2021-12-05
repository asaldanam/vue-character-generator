import { reactive } from '@vue/composition-api';
import { createStore } from '~/libs/createStore';

function useCounter() {
  const state = reactive({
    count: 0,
  });

  const actions = {
    increment(n: number) {
      state.count = state.count + n;
    },
  };

  return { state, actions };
}

export default createStore(useCounter);
