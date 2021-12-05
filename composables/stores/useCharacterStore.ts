import { reactive } from '@vue/composition-api';
import { createStore } from '~/shared/libs/createStore';
import Character from '~/models/character';
import { CharacterData, Stat, StatValue } from '~/models/character/types';

function useCharacterStore() {
  const state = reactive({
    data: null as CharacterData | null,
  });

  /** Carga un nuevo personaje a partir de la data en base64 */
  function load(base64Character?: string) {
    console.log({ base64Character });
    let character = new Character();
    try {
      if (base64Character) {
        const dataAsString = atob(base64Character);
        const data = JSON.parse(dataAsString);
        character.setData(data);
      }
    } catch {
      console.error('Invalid character string');
    } finally {
      const data = character.getData();
      state.data = data;
    }
  }

  /** Actualiza el valor de una estadística del personaje */
  function updateStat(payload: { stat: Stat; value: StatValue }) {
    if (!state.data) return;
    const character = new Character(state.data);
    character.setStatValue(payload.stat, payload.value);
    state.data = character.getData();
  }

  /** Obtiene la data del personaje como base 64 string */
  function getDataAsBase64() {
    if (!state.data) return;
    const dataAsString = JSON.stringify(state.data);
    const character = btoa(dataAsString);
    return character;
  }

  return { state, actions: { load, updateStat, getDataAsBase64 } };
}

export default createStore(useCharacterStore);
