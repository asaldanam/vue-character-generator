import { reactive } from '@vue/composition-api';
import { createStore } from '~/shared/libs/createStore';
import Character from '~/models/character';
import { CharacterData, Stat, StatValue } from '~/models/character/types';
import slugify from 'slugify';

function useCharacterStore() {
  const state = reactive({
    data: null as CharacterData | null,
    editMode: false,
  });

  /** Carga un nuevo personaje a partir de la data en base64 */
  function load(name: string) {
    let character = new Character();

    try {
      if (!name) throw new Error('Character not provided');
      const characters = loadCharactersStorage();
      const data = characters[name];
      if (!data) throw new Error('Character not found');

      if (!data.info.name) throw new Error(`Invalid character stored data for ${name}`);
      character.setData(data);
    } catch (e) {
      console.error(e);
      setEditMode(true);
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

  /** Guarda el personaje */
  function save(router: any) {
    if (!state?.data?.info) return;
    const name = slugify(state.data.info.name.toLocaleLowerCase());
    const characters = loadCharactersStorage();

    const updatedStorage = {
      ...characters,
      [name]: state.data,
    };

    localStorage.setItem('characters', JSON.stringify(updatedStorage));

    router.push({ params: { name } });
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

  return { state, actions: { load, save, updateStat, setEditMode, updateInfo } };
}

export default createStore(useCharacterStore);

function loadCharactersStorage() {
  const charactersStr = localStorage.getItem('characters');
  if (!charactersStr) return {};

  const characters = JSON.parse(charactersStr);

  return characters || {};
}
