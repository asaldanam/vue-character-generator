import {
  collection,
  limit,
  orderBy,
  startAt,
  where,
} from '@firebase/firestore';
import { actionTree, getterTree, mutationTree } from 'typed-vuex';
import { Character } from '~/models/character/types';
import { queryAllDocs } from '~/services/firestore/utils';

export const state = () => ({
  data: [] as Character[],
  loading: false as Boolean,
  error: null as string | null,
  query: {
    orderBy: '',
    startAt: 0,
    limit: 5,
    name: '',
  },
});

type State = ReturnType<typeof state>;

export const getters = getterTree(state, {
  state: (state) => state,
});

export const mutations = mutationTree(state, {
  REQUEST_DATA(state, query: State['query']) {
    state.loading = true;
    state.query = query;
  },
  SET_DATA(state, data: State['data']) {
    state.loading = false;
    state.data = data;
    state.error = null;
  },
  SET_ERROR(state, error: State['error']) {
    state.loading = false;
    state.data = [];
    state.error = error;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async fetch({ commit, state }, query: Partial<State['query']>) {
      try {
        commit('REQUEST_DATA', { ...state.query, ...query });
        const ref = collection(this.$fire.firestore, 'characters');
        const response = await queryAllDocs<Character>(ref, state.query);
        commit('SET_DATA', response);
      } catch (error) {
        commit('SET_ERROR', JSON.stringify(error));
      }
    },
  },
);
