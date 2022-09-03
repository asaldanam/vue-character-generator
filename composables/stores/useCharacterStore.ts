import { reactive } from '@vue/composition-api';
import slugify from 'slugify';
import { createStore } from '~/shared/libs/createStore';
import Character from '~/models/character';
import { CharacterData, Stat, StatValue } from '~/models/character/types';

function useCharacterStore() {
  const state = reactive({
    data: null as CharacterData | null,
  });

  /** Carga un nuevo personaje a partir de la data en base64 */
  function load(slug: string) {
    const character = new Character();

    try {
      if (!slug) throw new Error('Character not provided');
      const characters = loadCharactersStorage();
      const data = characters[slug];
      if (!data) throw new Error('Character not found');

      if (!data.info.name) throw new Error(`Invalid character stored data for ${slug}`);
      character.setData(data);
      return data;
    } catch (e) {
      console.error(e);
    } finally {
      const data = character.getData();
      state.data = data;
    }
  }

  /* Actualiza la información del personaje */
  function updateInfo(payload: Partial<CharacterData['info']>) {
    if (state.data) {
      state.data.info = {
        ...state.data.info,
        ...payload,
      };
    }
  }

  /** Actualiza el valor de una estadística del personaje */
  function updateStat(payload: { stat: Stat; value: StatValue }) {
    if (!state.data) return;
    const character = new Character(state.data);
    character.setStatValue(payload.stat, payload.value);
    state.data = character.getData();
  }

  /** Actualiza la vida actual */
  function updateState(newState: Partial<CharacterData['state']>) {
    if (!state.data) return;
    const character = new Character(state.data);
    character.updateState(newState);
    state.data = character.getData();
  }

  /** Guarda el personaje */
  function save() {
    if (!state?.data?.info) return;
    const name = slugify(state.data.info.name.toLowerCase());
    const characters = loadCharactersStorage();

    const updatedStorage = {
      ...characters,
      [name]: state.data,
    };

    localStorage.setItem('characters', JSON.stringify(updatedStorage));
  }

  /** Obtiene la data del personaje como base 64 string */
  function _getDataAsBase64() {
    if (!state.data) return;
    const dataAsString = JSON.stringify(state.data);
    const character = btoa(dataAsString);
    return character;
  }

  return {
    state,
    actions: { load, save, updateStat, updateInfo, updateState },
  };
}

export default createStore(useCharacterStore);

function loadCharactersStorage() {
  const charactersStr = localStorage.getItem('characters');
  if (!charactersStr) return {};

  const characters = JSON.parse(charactersStr);

  return characters || {};
}
