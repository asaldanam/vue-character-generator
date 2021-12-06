import { inject, provide, readonly, UnwrapRef } from '@vue/composition-api';
import uuid from '~/shared/utils/uuid';

const libMsgPrefix = '[createStore]';

export type Action<A extends any[], R> = (...args: A) => R;
type AnyActions = { [key: string]: Action<any[], any> };
export type Store<S> = () => { state: UnwrapRef<S>; actions: AnyActions };

export function createStore<S extends Store<any>>(store: S) {
  type State = ReturnType<S>['state'];
  type Actions = ReturnType<S>['actions'];

  const key = uuid();
  const stateKey = `${key}.state`;
  const actionsKey = `${key}.actions`;

  const instance = store();

  const providers = () => {
    provide(stateKey, readonly(instance.state));
    provide(actionsKey, instance.actions);
  };

  const injectors = () => {
    return [inject(stateKey), inject(actionsKey)] as [State, Actions];
  };

  return { providers, injectors };
}
