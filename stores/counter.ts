import { reactive } from '@vue/composition-api';
import { State, createStateSlice } from '~/libs/state';

export const Counter: State<{ count: number }> = () => {
  const state = reactive({
    count: 0,
  });

  const increment = () => {
    state.count++;
  };

  return { state, actions: { increment } };
};
