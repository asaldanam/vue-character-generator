import { doc, getDoc } from '@firebase/firestore';
import { actionTree, getterTree, mutationTree } from 'typed-vuex';
import Character from '~/models/character';
import { CharacterData, Stat, StatValue } from '~/models/character/types';

export const state = () => ({
  data: null as CharacterData | null,
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
  NEW_CHARACTER(state) {
    state.data = new Character().getData();
  },
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
  SET_CHARACTER(state, payload: CharacterData) {
    state.data = payload;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    async create({ commit, state }) {
      try {
        commit('NEW_CHARACTER');
      } catch (error) {
        commit('SET_ERROR', typeof error === 'string' ? error : JSON.stringify(error));
      }
    },

    async setStatValue({ commit, state: { data } }, payload: { stat: Stat; value: StatValue }) {
      if (!data) return;
      const character = new Character(data);
      character.setStatValue(payload.stat, payload.value);
      commit('SET_CHARACTER', character.getData());
    },

    async saveToUrl({ commit, state: { data } }) {
      if (!data) return;
      const dataAsString = JSON.stringify(data);
      const character = btoa(dataAsString);
      this.$router?.push({
        query: {
          name: data.info.name,
          character,
        },
      });
    },

    async fetch({ commit, state }, query: State['query']) {
      try {
        // commit('REQUEST_DATA', query);
        // const { id } = state.query;
        // if (!id) throw 'No id';
        // const docRef = doc(this.$fire.firestore, 'characters', id);
        // const docSnap = await getDoc(docRef);
        // const response = docSnap.data() as Character;
        // commit('SET_DATA', response);
      } catch (error) {
        commit('SET_ERROR', typeof error === 'string' ? error : JSON.stringify(error));
      }
    },
  },
);
