import { reactive } from '@vue/composition-api';
import { createStore } from '~/shared/libs/createStore';
import Character from '~/models/character';
import { CharacterData, Stat, StatValue } from '~/models/character/types';

function useCharacterStore() {
  const state = reactive({
    data: null as CharacterData | null,
    editMode: true,
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
    }
  }

  /** Actualiza el valor de una estadística del personaje */
  function updateStat(payload: { stat: Stat; value: StatValue }) {
    if (!state.data) return;
    const character = new Character(state.data);
    character.setStatValue(payload.stat, payload.value);
    state.data = character.getData();
  }

  /** Guarda el personaje */
  function save(router: any) {
    const characterAsBase64 = _getDataAsBase64();
    router.push({
      query: {
        name: state?.data?.info.name,
        character: characterAsBase64,
      },
    });
    setEditMode(false);
  }

  /** Obtiene la data del personaje como base 64 string */
  function _getDataAsBase64() {
    if (!state.data) return;
    const dataAsString = JSON.stringify(state.data);
    const character = btoa(dataAsString);
    return character;
  }

  function setEditMode(editMode: boolean) {
    state.editMode = editMode;
  }

  return { state, actions: { load, save, updateStat, setEditMode } };
}

export default createStore(useCharacterStore);
