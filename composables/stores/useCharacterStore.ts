import { reactive } from '@vue/composition-api';
import { createStore } from '~/shared/libs/createStore';
import Character from '~/models/character';
import { CharacterData, Stat, StatValue } from '~/models/character/types';

function useCharacterStore() {
  const state = reactive({
    data: null as CharacterData | null,
    hasChanges: false,
  });

  /** Carga un nuevo personaje a partir de la data en base64 */
  function load(base64Character?: string) {
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
      _setChanged(false);
    }
  }

  /** Actualiza el valor de una estadística del personaje */
  function updateStat(payload: { stat: Stat; value: StatValue }) {
    if (!state.data) return;
    const character = new Character(state.data);
    character.setStatValue(payload.stat, payload.value);
    state.data = character.getData();
    state.hasChanges = true;
    _setChanged(true);
  }

  function saveToUrl(router: any) {
    const characterAsBase64 = _getDataAsBase64();
    router.push({
      query: {
        name: state?.data?.info.name,
        character: characterAsBase64,
      },
    });
    _setChanged(false);
  }

  /** Obtiene la data del personaje como base 64 string */
  function _getDataAsBase64() {
    if (!state.data) return;
    const dataAsString = JSON.stringify(state.data);
    const character = btoa(dataAsString);
    return character;
  }

  function _setChanged(val: boolean) {
    state.hasChanges = val;
  }

  return { state, actions: { load, saveToUrl, updateStat } };
}

export default createStore(useCharacterStore);
