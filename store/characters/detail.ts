import { doc, getDoc } from '@firebase/firestore';
import { actionTree, getterTree, mutationTree } from 'typed-vuex';
import { Character, Stat } from '~/models/character/types';

export const state = () => ({
  data: null as Character | null,
  loading: false as Boolean,
  error: null as string | null,
  query: {
    id: null as string | null,
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
    state.data = null;
    state.error = error;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async fetch({ commit, state }, query: State['query']) {
      try {
        commit('REQUEST_DATA', query);
        const { id } = state.query;
        console.log(state);
        if (!id) throw 'No id';
        const docRef = doc(this.$fire.firestore, 'characters', id);
        console.log({ id });
        const docSnap = await getDoc(docRef);
        const response = docSnap.data() as Character;
        console.log({ response });
        commit('SET_DATA', response);
      } catch (error) {
        commit(
          'SET_ERROR',
          typeof error === 'string' ? error : JSON.stringify(error),
        );
      }
    },
  },
);
