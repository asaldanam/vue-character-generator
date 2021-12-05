import { inject, provide, readonly, UnwrapRef } from '@vue/composition-api';

const libMsgPrefix = '[createStore]';

export type Action<A extends any[], R> = (...args: A) => R;
type AnyActions = { [key: string]: Action<any[], any> };
export type Store<S> = () => { state: UnwrapRef<S>; actions: AnyActions };

export function createStore<S extends Store<any>>(store: S) {
  type State = ReturnType<S>['state'];
  type Actions = ReturnType<S>['actions'];

  const name = arguments[0]?.prototype?.constructor?.name;

  const key = name;
  const stateKey = `${key}.state`;
  const actionsKey = `${key}.actions`;

  const instance = store();

  const providers = () => {
    if (!name) {
      print.noName();
      return;
    }

    provide(stateKey, readonly(instance.state));
    provide(actionsKey, instance.actions);
  };

  const injectors = () => {
    return [inject(stateKey), inject(actionsKey)] as [State, Actions];
  };

  return { providers, injectors };
}

const print = {
  noName() {
    console.error(
      ` ${libMsgPrefix} Store callback must be a named function \n\n DO: createStore(myStoreFn) \n NOT: createStore(() => {state, actions})`,
    );
  },
};
