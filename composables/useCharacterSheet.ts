import { reactive } from '@vue/composition-api';
import { createStore } from '~/libs/createStore';
import Character from '~/models/character';
import { CharacterData, Stat, StatValue } from '~/models/character/types';

function useCharacterSheet() {
  const state = reactive({
    data: null as CharacterData | null,
    loading: false as Boolean,
    error: null as string | null,
    query: {
      id: null as string | null,
    },
  });

  function create() {
    const character = new Character();
    state.data = character.getData();
  }

  function setStatValue(payload: { stat: Stat; value: StatValue }) {
    if (!state.data) return;
    const character = new Character(state.data);
    character.setStatValue(payload.stat, payload.value);
    state.data = character.getData();
  }

  function getDataAsBase64() {
    if (!state.data) return;
    const dataAsString = JSON.stringify(state.data);
    const character = btoa(dataAsString);
    return character;
  }

  return { state, actions: { create, setStatValue, getDataAsBase64 } };
}

export default createStore(useCharacterSheet);
