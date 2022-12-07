import { inject, provide, readonly, ref } from "@nuxtjs/composition-api";
import uuid from "../utils/uuid";

export function useStore<
  R extends { state: any; actions: any },
  S extends (...args: any) => R
>(storeCreator: S) {
  const initialState = storeCreator().state;
  const state = ref(initialState);

  const instance = storeCreator(state.value);

  const key = uuid();
  const stateKey = `${key}.state`;
  const actionsKey = `${key}.actions`;

  const providers = () => {
    provide(stateKey, readonly(state.value));
    provide(actionsKey, instance.actions);
  };

  const injectors = () => {
    const state = inject(stateKey);
    const actions = inject(actionsKey);

    return [state, actions] as [ReturnType<S>['state'], ReturnType<S>['actions']];
  };

  return {
    providers,
    injectors
  }
}
