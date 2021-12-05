import { reactive, provide, readonly, UnwrapRef } from '@nuxtjs/composition-api';

export type Action<A extends any[], R> = (...args: A) => R;

type AnyActions = { [key: string]: Action<any[], any> };
export type State<S> = () => { state: UnwrapRef<S>; actions: AnyActions };

export function createStateSlice<S extends State<any>>(store: S) {
  type State = ReturnType<S>['state'];
  type Actions = ReturnType<S>['actions'];

  const name = arguments[0]?.prototype?.constructor?.name;
  const state: State = store().state;
  const actions: Actions = store().actions;

  const slice = { state, actions, name };
  console.log({ slice });
  return slice;
}

export function useStateProviders(slice: ReturnType<typeof createStateSlice>) {
  console.log({ slice });
  provide(`${slice.name}.state`, readonly(slice.state));
  provide(`${slice.name}.actions`, slice.actions);
}
