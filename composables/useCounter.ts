import { inject, provide, reactive, readonly } from '@vue/composition-api';

// export default function useCounter() {
//   const state = reactive({
//     count: 0,
//   });

//   const actions = {
//     increment() {
//       state.count++;
//     },
//   };

//   const setProviders = () => {
//     provide('Counter.state', readonly(state));
//     provide('Counter.actions', actions);
//   };

//   const getInjectors = () => ({
//     state: inject('Counter.state'),
//     actions: inject('Counter.actions'),
//   });

//   return {
//     setProviders,
//     getInjectors,
//   };
// }

function createStore(store) {
  const instance = store();
  console.log({ store, instance });

  const providers = () => {
    provide('Counter.state', readonly(instance.state));
    provide('Counter.actions', instance.actions);
  };

  const injectors = () => ({
    state: inject('Counter.state'),
    actions: inject('Counter.actions'),
  });

  return { providers, injectors };
}

const useCounter = createStore(() => {
  const state = reactive({
    count: 0,
  });

  const actions = {
    increment() {
      state.count++;
    },
  };

  return { state, actions };
});

export default useCounter;
